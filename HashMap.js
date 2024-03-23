import { Bucket } from "./Bucket.js";
import { hash, createMap } from "./utils.js";

const HashMap = ({ loadFactor = 0.75, initialCapacity = 16 } = {}) => {
  let currentCapacity = initialCapacity;
  let currentLoad = 0;
  let map = createMap(initialCapacity);
  const isInBounds = (index) => {
    if (index < 0 || index >= map.length) throw new Error("Trying to access index out of bound");
  };
  const grow = () => {
    currentCapacity *= 2;
    const oldMap = map;
    map = createMap(currentCapacity);
    currentLoad = 0;
    oldMap.forEach((bucket) => {
      if (bucket) {
        let currentNode = bucket.getHead();
        while (currentNode) {
          set(currentNode.data.key, currentNode.data.value);
          currentNode = currentNode.next;
        }
      }
    });
  };
  const addToEmpty = (code, key, value) => {
    map[code] = Bucket(key, value);
    currentLoad += 1;
    if (currentLoad / currentCapacity >= loadFactor) grow();
  };
  const checkBucketForUpdate = (bucket, key, value) => {
    const nodeData = bucket.getNodeData(key);
    if (!nodeData) return false;
    nodeData.value = value;
    return true;
  };
  const set = (key, value) => {
    const code = hash(key, currentCapacity);
    const bucket = map[code];
    if (!bucket) addToEmpty(code, key, value);
    else if (checkBucketForUpdate(bucket, key, value)) return;
    else bucket.append(key, value);
  };
  const get = (key) => {
    const code = hash(key, currentCapacity);
    return map[code]?.getNodeData(key)?.value;
  };
  const has = (key) => !!get(key);
  return { get, set, has };
};

const test = HashMap();
test.set("az", 600);
test.set("zc", 900);

console.log(test.get("zc"));
