import { vi, beforeEach, it, expect, describe } from "vitest";
import { HashMap } from "./HashMap";

let hashMap;
beforeEach(() => {
  hashMap = HashMap();
});

const set = (number) => hashMap.set(`key${number}`, `value${number}`);

describe("HashMap", () => {
  it("should initialize with a default load factor and capacity", () => {
    expect(hashMap.currentCapacity()).toBe(16);
    expect(hashMap.currentLoad()).toBe(0);
  });
  it("should set and get values correctly", () => {
    set(1);
    expect(hashMap.get("key1")).toBe("value1");
  });
  it("should correctly indicate the existence of a key", () => {
    set(2);
    expect(hashMap.has("key2")).toBe(true);
    expect(hashMap.has("nonexistentKey")).toBe(false);
  });
  it("should remove a key-value pair", () => {
    set(3);
    expect(hashMap.has("key3")).toBe(true);
    hashMap.remove("key3");
    expect(hashMap.has("key3")).toBe(false);
  });
  it("should clear the map", () => {
    set(4);
    set(5);
    expect(hashMap.length()).toBeGreaterThan(0);
    hashMap.clear();
    expect(hashMap.length()).toBe(0);
  });
  it("should grow according to the load factor", () => {
    for (let i = 0; i <= 12; i++) set(i);
    expect(hashMap.currentCapacity()).toBeGreaterThan(16);
  });
  it("should maintain accurate size count", () => {
    set(6);
    set(7);
    expect(hashMap.length()).toBe(2);
    hashMap.remove("key6");
    expect(hashMap.length()).toBe(1);
  });
  it("should iterate over keys, values, and entries", () => {
    set(8);
    set(9);
    const keys = hashMap.keys();
    expect(keys).toContain("key8");
    expect(keys).toContain("key9");
    const values = hashMap.values();
    expect(values).toContain("value8");
    expect(values).toContain("value9");
    const entries = hashMap.entries();
    expect(entries).toEqual(
      expect.arrayContaining([
        ["key8", "value8"],
        ["key9", "value9"],
      ])
    );
  });
  it("should update the value for a duplicate key", () => {
    set(10);
    hashMap.set("key10", "newValue10");
    expect(hashMap.get("key10")).toBe("newValue10");
    expect(hashMap.length()).toBe(1);
  });
  it("should handle removal of a non-existent key gracefully", () => {
    const initialLength = hashMap.length();
    hashMap.remove("nonexistentKey");
    expect(hashMap.length()).toBe(initialLength); // Length remains unchanged
  });
  it("should decrease the load when entries are removed", () => {
    for (let i = 0; i < 5; i++) set(i);
    const initialLoad = hashMap.currentLoad();
    hashMap.remove("key3");
    expect(hashMap.currentLoad()).toBeLessThan(initialLoad);
  });
  it("should function correctly after being cleared", () => {
    for (let i = 0; i < 10; i++) set(i);
    hashMap.clear();
    set(20);
    expect(hashMap.get("key20")).toBe("value20");
    expect(hashMap.has("key0")).toBe(false);
  });
  it("should only grow when exceeding the load factor", () => {
    for (let i = 0; i < 12; i++) set(i);
    expect(hashMap.currentCapacity()).toBe(16);
    set(12);
    expect(hashMap.currentCapacity()).toBeGreaterThan(16);
  });
  it("should handle collisions by adding to linked list", () => {
    const testKey1 = "az"; // hash('az') = 9
    const testKey2 = "zc"; // hash('zc') = 9
    hashMap.set(testKey1, 5000);
    hashMap.set(testKey2, -900);
    expect(hashMap.length()).toBe(2);
    expect(hashMap.length(false)).toBe(1);
    expect(hashMap.get(testKey1)).toBe(5000);
    expect(hashMap.get(testKey2)).toBe(-900);
  });
});
