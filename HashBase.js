import { Bucket, BUCKET_DATA_TYPES } from "./Bucket.js";

const PRIME_FACTOR = 31;

/**
 * Provides a base implementation for Hash-based data structures.
 *
 * @param {Object} detail Contains base data structure details
 * @returns {Object} Base implementation interface.
 */
export const HashBase = ({ loadFactor = 0.75, initialCapacity = 16, type } = {}) => {
  const hash = (key) =>
    key.split("").reduce((acc, char) => (PRIME_FACTOR * acc + char.charCodeAt(0)) % currentCapacity, 0);

  const createArray = (capacity) => Array.from({ length: capacity }, () => null);

  let currentCapacity = initialCapacity;
  let currentLoad = 0;
  let map = createArray(initialCapacity);

  const overrides = {
    set: () => {},
    get: () => {},
  };

  const getBucket = (code, autoAdd = true) => {
    if (code < 0 || code >= map.length) throw new Error("Trying to access index out of bound");
    let bucket = map[code];
    if (bucket) return bucket;
    else if (!autoAdd) return null;
    map[code] = Bucket(type);
    bucket = map[code];
    currentLoad += 1;
    if (currentLoad / currentCapacity > loadFactor) grow();
    return bucket;
  };
  const getAllBuckets = () => map.filter((entry) => entry !== null);

  const grow = () => {
    currentCapacity *= 2;
    currentLoad = 0;
    const buckets = getAllBuckets();
    map = createArray(currentCapacity);
    buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode) {
        overrides.set(currentNode.data.key, currentNode.data.value);
        currentNode = currentNode.next;
      }
    });
  };

  const remove = (key) => {
    const code = hash(key);
    const bucket = getBucket(code, false);
    let result = false;
    if (bucket) {
      result = bucket.removeNode(key);
      if (result && bucket.isEmpty()) {
        map[code] = null;
        currentLoad--;
      }
    }
    return result;
  };

  const length = (allKeys = true) => {
    const buckets = getAllBuckets();
    if (!allKeys) return buckets.length;
    return buckets.reduce((acc, bucket) => acc + bucket.getSize(), 0);
  };

  const has = (key) => !!overrides.get(key);

  const clear = () => {
    const buckets = getAllBuckets();
    buckets.forEach((bucket) => bucket.clear());
    map = createArray(initialCapacity);
  };

  const keys = () => getAllBuckets().flatMap((bucket) => bucket.getAllNodeData(BUCKET_DATA_TYPES.KEY));

  return {
    hash,
    remove,
    length,
    clear,
    has,
    keys,
    currentCapacity: () => currentCapacity,
    currentLoad: () => currentLoad,
    getBucket,
    getAllBuckets,
    setSetFn: (fn) => {
      overrides.set = fn;
      return overrides.set;
    },
    setGetFn: (fn) => {
      overrides.get = fn;
      return overrides.get;
    },
  };
};
