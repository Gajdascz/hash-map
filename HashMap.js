import { Bucket } from "./Bucket.js";
import { hash, createMap, BUCKET_TYPES } from "./utils.js";

const HashMap = ({ loadFactor = 0.75, initialCapacity = 16 } = {}) => {
  let currentCapacity = initialCapacity;
  let currentLoad = 0;
  let map = createMap(initialCapacity);
  let workingHashCode = null;
  const getBucket = (key, autoAdd = true) => {
    workingHashCode = hash(key, currentCapacity);
    if (workingHashCode < 0 || workingHashCode >= map.length) throw new Error("Trying to access index out of bound");
    const bucket = map[workingHashCode];
    if (bucket) return bucket;
    else if (!autoAdd) return null;
    map[workingHashCode] = Bucket(BUCKET_TYPES.MAP);
    currentLoad += 1;
    if (currentLoad / currentCapacity >= loadFactor) grow();
    return map[workingHashCode];
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
  const checkBucketForUpdate = (bucket, key, value) => {
    const nodeData = bucket.getNodeData(key);
    if (!nodeData) return false;
    nodeData.value = value;
    return true;
  };
  const set = (key, value) => {
    const bucket = getBucket(key, true);
    if (!checkBucketForUpdate(bucket, key, value)) bucket.append(key, value);
    workingHashCode = null;
  };
  const get = (key) => {
    const nodeValue = getBucket(key, false)?.getNodeData(key)?.value;
    workingHashCode = null;
    if (!nodeValue) return null;
    return nodeValue;
  };
  const has = (key) => !!get(key);

  const remove = (key) => {
    const bucket = getBucket(key, false);
    if (bucket) {
      const result = bucket.removeNode(key);
      if (result && bucket.isEmpty()) map[workingHashCode] = null;
    }
    workingHashCode = null;
    return result;
  };
  return { get, set, has, remove };
};
