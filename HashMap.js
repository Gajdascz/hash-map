import { BUCKET_TYPES, BUCKET_DATA_TYPES } from "./Bucket.js";

import { HashBase } from "./HashBase.js";

/**
 * Implements the HashBase to create manage key/value pair data.
 *
 * @param {Object} detail Initialization detail.
 * @returns {Object} HashMap interface.
 */
export const HashMap = ({ loadFactor = 0.75, initialCapacity = 16 } = {}) => {
  const base = HashBase({ loadFactor, initialCapacity, type: BUCKET_TYPES.MAP });
  const {
    hash,
    remove,
    length,
    clear,
    keys,
    has,
    currentCapacity,
    currentLoad,
    getBucket,
    setSetFn,
    setGetFn,
    getAllBuckets,
  } = base;

  const get = setGetFn((key) => getBucket(hash(key), false)?.getNodeData(key)?.value);
  const set = setSetFn((key, value) => {
    const bucket = getBucket(hash(key), true);
    const data = bucket.getNodeData(key);
    if (data) data.value = value;
    else bucket.append(key, value);
  });
  const values = () => getAllBuckets().flatMap((bucket) => bucket.getAllNodeData(BUCKET_DATA_TYPES.VALUE));
  const entries = () => getAllBuckets().flatMap((bucket) => bucket.getAllNodeData(BUCKET_DATA_TYPES.ENTRY));

  return {
    get,
    set,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    currentCapacity,
    currentLoad,
  };
};
