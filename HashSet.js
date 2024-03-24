import { BUCKET_TYPES } from "./Bucket.js";
import { HashBase } from "./HashBase.js";

/**
 * Implements the HashBase to create manage key data.
 *
 * @param {Object} detail Initialization detail.
 * @returns {Object} HashSet interface.
 */
export const HashSet = ({ loadFactor = 0.75, initialCapacity = 16 } = {}) => {
  const base = HashBase({ loadFactor, initialCapacity, type: BUCKET_TYPES.SET });
  const { hash, remove, length, clear, keys, has, currentCapacity, currentLoad, getBucket, setSetFn, setGetFn } = base;

  const get = setGetFn((key) => getBucket(hash(key), false)?.getNodeData(key)?.key);
  const add = setSetFn((key) => getBucket(hash(key), true).append(key));

  return {
    get,
    add,
    has,
    remove,
    length,
    clear,
    keys,
    currentCapacity,
    currentLoad,
  };
};
