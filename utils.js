const PRIME_FACTOR = 31;
const BUCKET_TYPES = {
  MAP: "map",
  SET: "set",
};
const hash = (key, capacity) => {
  let hashCode = 0;
  for (let i = 0; i < key.length; i++) {
    hashCode = (PRIME_FACTOR * hashCode + key.charCodeAt(i)) % capacity;
  }
  return hashCode;
};
const createMap = (capacity) => Array.from({ length: capacity }, () => null);

export { BUCKET_TYPES, hash, createMap };
