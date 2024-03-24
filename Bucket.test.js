import { beforeEach, it, expect, describe } from "vitest";
import { Bucket, BUCKET_TYPES, BUCKET_DATA_TYPES } from "./Bucket";

const testNodes = {
  one: { key: "testOne", value: "Lorem" },
  two: { key: "testTwo", value: "Ipsum" },
  three: { key: "testThree", value: "Dolor" },
};

describe("Bucket Linked List", () => {
  describe("Map Type", () => {
    let bucket;
    beforeEach(() => (bucket = Bucket(BUCKET_TYPES.MAP)));
    const isHead = (node) => {
      const head = bucket.getHead();
      console.log(node, head);
      const { key, value } = head.data;
      return key === node.key && value === node.value;
    };
    const isTail = (node) => {
      const tail = bucket.getTail();
      const { key, value } = tail.data;
      return key === node.key && value === node.value;
    };
    const { one, two, three } = testNodes;
    const addNode = (node) => bucket.append(node.key, node.value);
    const addAllNodes = () => {
      Object.values(testNodes).forEach((node) => bucket.append(node.key, node.value));
    };
    it("should initialize properly", () => {
      expect(bucket.isEmpty()).toBe(true);
      expect(bucket.getHead()).toBe(null);
      expect(bucket.getTail()).toBe(null);
      expect(bucket.getType()).toBe(BUCKET_TYPES.MAP);
    });
    it("should append the first node", () => {
      addNode(one);
      expect(isHead(one)).toBe(true);
      expect(isTail(one)).toBe(true);
      expect(bucket.getSize()).toBe(1);
    });
    it("Should append the second node", () => {
      addNode(one);
      addNode(two);
      expect(isHead(one)).toBe(true);
      expect(isTail(two)).toBe(true);
      expect(bucket.getSize()).toBe(2);
    });
    it("should prepend nodes correctly", () => {
      addNode(one);
      bucket.prepend(three.key, three.value);
      expect(isHead(three)).toBe(true);
      expect(isTail(one)).toBe(true);
    });
    it("should return the node's data", () => {
      addAllNodes();
      expect(bucket.getNodeData(one.key)).toEqual(one);
      expect(bucket.getNodeData(two.key)).toEqual(two);
      expect(bucket.getNodeData(three.key)).toEqual(three);
    });
    describe("Remove function", () => {
      beforeEach(() => addAllNodes());
      it("should remove a node with the given key", () => {
        expect(bucket.removeNode(two.key)).toBe(true);
        expect(bucket.getNodeData(two)).toBe(null);
      });
      it("should handle removal of the head node", () => {
        expect(bucket.removeNode(one.key)).toBe(true);
        expect(bucket.getHead().key).not.toBe(one.key);
      });
      it("should handle removal of the tail node", () => {
        expect(bucket.removeNode(three.key)).toBe(true);
        expect(bucket.getTail().key).not.toBe(three.key);
      });
      it("should return false if the key does not exist", () => {
        expect(bucket.removeNode(5)).toBe(false);
      });

      it("should adjust the size of the list upon removal", () => {
        const initialSize = bucket.getSize();
        bucket.removeNode(two.key);
        expect(bucket.getSize()).toBe(initialSize - 1);
      });
      it("should set head and tail to null if the list becomes empty", () => {
        bucket.removeNode(one.key);
        bucket.removeNode(two.key);
        bucket.removeNode(three.key);
        expect(bucket.getHead()).toBeNull();
        expect(bucket.getTail()).toBeNull();
        expect(bucket.isEmpty()).toBe(true);
      });
    });
    it("should clear all nodes", () => {
      addAllNodes();
      expect(bucket.getSize()).toBe(3);
      bucket.clear();
      expect(bucket.getSize()).toBe(0);
      expect(bucket.getHead()).toBe(null);
      expect(bucket.getTail()).toBe(null);
    });
    it("should return specified data types", () => {
      addAllNodes();
      expect(bucket.getAllNodeData(BUCKET_DATA_TYPES.KEY)).toEqual([one.key, two.key, three.key]);
      expect(bucket.getAllNodeData(BUCKET_DATA_TYPES.VALUE)).toEqual([one.value, two.value, three.value]);
      expect(bucket.getAllNodeData(BUCKET_DATA_TYPES.ENTRY)).toEqual([
        [one.key, one.value],
        [two.key, two.value],
        [three.key, three.value],
      ]);
    });
  });
});
