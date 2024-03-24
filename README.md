# HashMap

This repository features JavaScript implementations of HashMap and HashSet. Both are built on a common base, HashBase, to explore fundamental hashing concepts. This project deepened my understanding on the fundamentals of hash functions and their application in data structures.

- **Project Page**:
  [Created as part of The Odin Project curriculum](https://www.theodinproject.com/lessons/javascript-hashmap)

## Hash Formula

The project uses a basic hash formula to focus on the data structures rather than the complexity of hash algorithms:

` const hash = (key) => key.split("").reduce((acc, char) => (PRIME_FACTOR * acc + char.charCodeAt(0)) % currentCapacity, 0);`

<details><summary>Function Anatomy and Reasoning</summary>
- `(key) => key.split("")`:  Converts the key into an array of characters.
- `reduce((acc,char) => )`: Reduce is used to iteratively calculate a unique hash code for each character.
- `PRIME_FACTOR * acc + char.charCodeAt(0)`: 
  - PRIME_FACTOR set to 31 for its properties in hash calculations allowing minimal collisions and ensuring a uniform distribution of hash codes.
  - acc is modified at each iteration based on the previous result.
  - char.charCodeAt(0) returns the character code allowing numeric calculation.
  - `% currentCapacity`: Confines the hash code within the bounds of the current structures index limit.
</details>

## Bucket

The `Bucket` module implements a doubly-linked list, serving a critical role in managing collisions within the hash structure. On initialization, it requires a type argument that specifies whether the bucket is for a `map` or a `set`. This argument influences the internal node structure through a strategy pattern, determining whether nodes will contain a `{key, value}` pair (for maps) or a single `{key}` (for sets).

Each node features a `data` property, the contents of which—either `{key, value}` or `{key}`—depend on the type specified during the bucket's initialization. In addition to standard linked-list operations, the bucket provides:

- `getNodeData`: Retrieves the data property from a node, providing access to either the key-value pair or the key alone
- `getAllNodeData`: This method takes a type parameter and leverages a strategy pattern to return data in the requested format. Depending on the type, it can return just the key(s), just the value(s), or the entries (key-value pairs).

## Hash Structures

### Base

The `HashBase` module providing the fundamental foundation for creating hash-based data structures such as a HashMap and HashSet.

- **Configurable Initialization**: Accepts a load factor and initial capacity upon initialization.
- **Dynamic Resizing**: Automatically expands the structure's size based on the load factor.
- **Collision Handling**: Manages collisions efficiently with a [Bucket](#bucket) structure.
- **Utility Methods**: Provides remove, clear, and keys for ease-of-use.
- **Bucket Management**: Automated internal bucket management .
- **Growth Strategy**: Doubles capacity and rehashes entries as needed.

Implement by creating a base instance and defining set and get methods via `setSetFn(fn)` and `setGetFn(fn)`.

### Set and Map

- `HashSet`: Manages unique keys, appending duplicates to a bucket's linked list.
- `HashMap`: Handles key-value pairs, with duplicates updating the original entry's value.

## Key Takeaways

- **One-Way Operation**: Unlike encryption, which is designed to be reversible, hashing is a one-way operation. This makes it particularly useful for creating secure systems for storing and managing sensitive data, such as passwords.
- **Efficiency in Data Structures**: Hashing plays a crucial role in data structures by enabling efficient access to keys and key/value pairs. This efficiency comes from the ability to quickly locate a value at its unique hash code, minimizing the need for exhaustive searches.
- **Buckets**: In the context of a hash map, "buckets" are the unit in which data is stored. Each bucket can potentially hold multiple entries, which are managed through collision resolution strategies.
- **Collision Management**: Collisions occur when different keys produce the same hash code. A common approach to handle collisions within hash maps is to use a linked list for each bucket. This allows multiple values that share a hash code to be stored and retrieved efficiently from the same location in the data structure.
- **Capacity and Load Factor**:
  - **Capacity**: Describes the total number of buckets a hash structure can hold at any given time. It's a measure of the structure's size and can dynamically change to accommodate more entries.
  - **Load Factor**: Acts as a threshold for resizing the hash structure. It's calculated as the ratio of the current number of entries to the total capacity (currentLoad / currentCapacity). When the load factor exceeds a predefined limit, the structure increases its capacity to maintain efficient access times.

## Created With

- Core Language: JavaScript
- Testing Framework: Vitest

## License

Copyright © 2024 Nolan Gajdascz | [GitHub](https://github.com/Gajdascz)

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file
for details.
