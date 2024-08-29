import { Stack } from "./Stack";
import { describe, expect, it } from "vitest";

describe("Stack", () => {
  it("is empty by default", () => {
    const stack = new Stack<number>();
    expect(stack.empty()).toBe(true);
  });

  it("grows in size when an item is pushed onto it", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size()).toBe(3);
  });

  it("decreases in size when an item is poppped from it", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    const popped = stack.pop();

    expect(stack.size()).toBe(2);
    expect(popped).toBe(3);
  });

  it("throws an Error when popping from an empty stack", () => {
    const stack = new Stack<number>();

    expect(() => stack.pop()).toThrowError("Cannot pop from an empty stack");
  });

  it("peek retrieves the item last pushed onto the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
  });

  it("prohibits pushing onto a full stack", () => {
    const stack = new Stack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect(() => stack.push(6)).toThrowError(
      "Stack has reached maximum capacity"
    );
    expect(stack.size()).toBe(5);
  });
});
