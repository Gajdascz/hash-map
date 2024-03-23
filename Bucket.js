import { BUCKET_TYPES } from "./utils";
const MapNode = ({ key = null, value = null, next = null, prev = null } = {}) => ({
  data: {
    key,
    value,
  },
  next,
  prev,
});

const SetNode = ({ key = null, next = null, prev = null } = {}) => ({
  data: {
    key,
  },
  next,
  prev,
});

export const Bucket = (type) => {
  let head = null;
  let tail = null;
  let size = 0;

  const getNode = type === BUCKET_TYPES.MAP ? MapNode : SetNode;

  const setFirst = (node) => {
    head = node;
    tail = node;
    size = 1;
  };

  const append = (key, value = null) => {
    const node = getNode({ key, value });
    if (!head) setFirst(node);
    else {
      tail.next = node;
      node.prev = tail;
      tail = node;
      size++;
    }
  };

  const prepend = (key, value = null) => {
    const node = getNode({ key, value });
    if (!head) setFirst(node);
    else {
      head.prev = node;
      node.next = head;
      head = node;
      size++;
    }
  };

  const getNodeData = (key) => {
    let currentNode = head;
    while (currentNode !== null) {
      if (currentNode.data.key === key) return currentNode.data;
      currentNode = currentNode.next;
    }
  };

  const removeHead = () => {
    if (!head) return false;
    head = head.next;
    if (head) head.prev = null;
    else tail = null;
    size--;
    return true;
  };
  const removeTail = () => {
    if (!tail) return false;
    tail = tail.prev;
    if (tail) tail.next = null;
    else head = null;
    size--;
    return true;
  };

  const removeNode = (key) => {
    if (head && head.data.key === key) return removeHead();
    if (tail.data.key === key) return removeTail();
    let currentNode = head;
    while (currentNode) {
      if (currentNode.data.key === key) {
        currentNode.prev.next = currentNode.next;
        if (currentNode.next) currentNode.next.prev = currentNode.prev;
        size--;
        return true;
      } else currentNode = currentNode.next;
    }
    return false;
  };

  return {
    getHead: () => head,
    getTail: () => tail,
    getSize: () => size,
    getType: () => type,
    isEmpty: () => size === 0,
    append,
    prepend,
    getNodeData,
    removeNode,
  };
};
