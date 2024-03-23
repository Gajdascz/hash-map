const PRIME_FACTOR = 31;

const hash = (key, capacity) => {
  let hashCode = 0;
  for (let i = 0; i < key.length; i++) {
    hashCode = (PRIME_FACTOR * hashCode + key.charCodeAt(i)) % capacity;
  }
  return hashCode;
};
const createMap = (capacity) => Array.from({ length: capacity }, () => null);

export { hash, createMap };
