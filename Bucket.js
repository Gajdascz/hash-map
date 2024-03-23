const MapNode = ({ key = null, value = null, next = null }) => ({
  data: {
    key,
    value,
  },
  next,
});

export const Bucket = (key = null, value = null) => {
  let head = null;
  let tail = null;
  let size = 0;

  const setFirst = (node) => {
    head = node;
    tail = node;
    size = 1;
  };

  const append = (key, value = null) => {
    const node = MapNode({ key, value });
    if (!head) setFirst(node);
    else {
      tail.next = node;
      tail = node;
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

  const removeNode = (key) => {
    if (head && head.key === key) {
      head = head.next;
      if (!head) tail = null;
      size--;
      return;
    }
    let currentNode = head;
    while (currentNode && currentNode.next !== null) {
      if (currentNode.next.key === key) {
        if (currentNode.next === tail) {
          tail = currentNode;
        }
        currentNode.next = currentNode.next.next;
        size--;
        return;
      }
      currentNode = currentNode.next;
    }
  };

  if (key) append(key, value);
  return {
    getHead: () => head,
    getTail: () => tail,
    getSize: () => size,
    append,
    getNodeData,
    removeNode,
  };
};
