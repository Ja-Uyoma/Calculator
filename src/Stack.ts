interface IStack<T> {
  /**
   * Push an item on to the stack
   * @param item The item to be pushed on to the stack
   */
  push(item: T): void;

  /**
   * Pop an item from the stack
   * @returns The item at the top of the stack
   */
  pop(): T;

  /**
   * Get the item at the top of the stack
   * @returns The item at the top of the stack
   */
  peek(): T;

  /**
   * Get the number of items in the stack
   * @returns The number of items present in the stack
   */
  size(): number;

  /**
   * Check if the stack is empty or not
   * @returns True if the stack is empty, false otherwise
   */
  empty(): boolean;
}

export class Stack<T> implements IStack<T> {
  private store: T[] = [];

  /**
   * Create a new stack of the specified capacity
   * @param capacity The maximum number of items that the stack can hold
   */
  constructor(private capacity: number = Infinity) {}

  /**
   * Push an item on to the stack
   * @param item The item to be pushed on to the stack
   */
  push(item: T): void {
    if (this.size() === this.capacity) {
      throw new Error("Stack has reached maximum capacity");
    } else {
      this.store.push(item);
    }
  }

  /**
   * Pop an item from the stack
   * @returns The item at the top of the stack
   */
  pop(): T {
    const top = this.store.pop();

    if (top === undefined) {
      throw new Error("Cannot pop from an empty stack");
    }

    return top;
  }

  /**
   * Get the item at the top of the stack
   * @returns The item at the top of the stack
   */
  peek(): T {
    const top = this.store[this.size() - 1];

    if (top === undefined) {
      throw new Error("Cannot peek at an empty stack");
    }

    return top;
  }

  /**
   * Get the number of items in the stack
   * @returns The number of items present in the stack
   */
  size(): number {
    return this.store.length;
  }

  /**
   * Check if the stack is empty or not
   * @returns True if the stack is empty, false otherwise
   */
  empty(): boolean {
    return this.size() == 0;
  }
}
