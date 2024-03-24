export const BUCKET_TYPES = {
  MAP: "map",
  SET: "set",
};
export const BUCKET_DATA_TYPES = {
  KEY: "key",
  VALUE: "value",
  ENTRY: "entry",
};

const { MAP, SET } = BUCKET_TYPES;
const { KEY, VALUE, ENTRY } = BUCKET_DATA_TYPES;

const buildNode = {
  [SET]: ({ key = null, next = null, prev = null }) => ({
    data: { key },
    next,
    prev,
  }),
  [MAP]: ({ key = null, value = null, next = null, prev = null } = {}) => ({
    data: { key, value },
    next,
    prev,
  }),
};

export const Bucket = (type) => {
  let head = null;
  let tail = null;
  let size = 0;

  const setFirst = (node) => {
    head = node;
    tail = node;
    size = 1;
  };

  const append = (key, value = null) => {
    const node = buildNode[type]({ key, value });
    if (!head) setFirst(node);
    else {
      tail.next = node;
      node.prev = tail;
      tail = node;
      size++;
    }
  };

  const prepend = (key, value = null) => {
    const node = buildNode[type]({ key, value });
    if (!head) setFirst(node);
    else {
      head.prev = node;
      node.next = head;
      head = node;
      size++;
    }
  };

  const getNode = (key) => {
    let currentNode = head;
    while (currentNode !== null) {
      if (currentNode.data.key === key) return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  };

  const getNodeData = (key) => getNode(key)?.data || null;

  const getAllNodeData = (type = ENTRY) => {
    const typeStrategy = {
      [KEY]: (node) => node.data.key,
      [VALUE]: (node) => node.data.value,
      [ENTRY]: (node) => [node.data.key, node.data.value],
    };
    const dataArr = [];
    let currentNode = head;
    while (currentNode) {
      dataArr.push(typeStrategy[type](currentNode));
      currentNode = currentNode.next;
    }
    return dataArr;
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
    if (head?.data.key === key) return removeHead();
    if (tail?.data.key === key) return removeTail();
    const node = getNode(key);
    if (!node) return false;
    node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    size--;
    return true;
  };

  const clear = () => {
    while (size > 0) removeHead();
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
    getAllNodeData,
    removeNode,
    clear,
  };
};
