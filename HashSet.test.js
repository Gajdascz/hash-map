import { beforeEach, it, expect, describe } from "vitest";
import { HashSet } from "./HashSet";

let hashSet;
beforeEach(() => {
  hashSet = HashSet();
});

const add = (number) => hashSet.add(`key${number}`);

describe("HashSet", () => {
  it("should initialize with a default load factor and capacity", () => {
    expect(hashSet.currentCapacity()).toBe(16);
    expect(hashSet.currentLoad()).toBe(0);
  });

  it("should add keys correctly", () => {
    add(1);
    expect(hashSet.has("key1")).toBe(true);
  });

  it("should correctly indicate the existence of a key", () => {
    add(2);
    expect(hashSet.has("key2")).toBe(true);
    expect(hashSet.has("nonexistentKey")).toBe(false);
  });

  it("should remove a key", () => {
    add(3);
    expect(hashSet.has("key3")).toBe(true);
    hashSet.remove("key3");
    expect(hashSet.has("key3")).toBe(false);
  });

  it("should clear the set", () => {
    add(4);
    add(5);
    expect(hashSet.length()).toBeGreaterThan(0);
    hashSet.clear();
    expect(hashSet.length()).toBe(0);
  });

  it("should grow according to the load factor", () => {
    for (let i = 0; i <= 12; i++) add(i);
    expect(hashSet.currentCapacity()).toBeGreaterThan(16);
  });

  it("should maintain accurate size count", () => {
    add(6);
    add(7);
    expect(hashSet.length()).toBe(2);
    hashSet.remove("key6");
    expect(hashSet.length()).toBe(1);
  });

  it("should function correctly after being cleared", () => {
    for (let i = 0; i < 10; i++) add(i);
    hashSet.clear();
    add(20);
    expect(hashSet.has("key20")).toBe(true);
    expect(hashSet.has("key0")).toBe(false);
  });

  it("should only grow when exceeding the load factor", () => {
    for (let i = 0; i < 12; i++) add(i);
    expect(hashSet.currentCapacity()).toBe(16);
    add(12);
    expect(hashSet.currentCapacity()).toBeGreaterThan(16);
  });

  it("should handle collisions by adding to linked list", () => {
    const testKey1 = "az";
    const testKey2 = "zc";
    hashSet.add(testKey1);
    hashSet.add(testKey2);
    expect(hashSet.length()).toBe(2);
    expect(hashSet.length(false)).toBe(1);
    expect(hashSet.has(testKey1)).toBe(true);
    expect(hashSet.has(testKey2)).toBe(true);
  });
});
