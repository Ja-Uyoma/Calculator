import {
  isOperator,
  isNumber,
  processRightBracket,
  processOperator,
  parseAndEvaluate,
  evaluate,
} from "./Parser";

import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("isOperator", () => {
  it("returns true if a given character is an operator", () => {
    expect(isOperator("+")).toBe(true);
    expect(isOperator("-")).toBe(true);
    expect(isOperator("×")).toBe(true);
    expect(isOperator("÷")).toBe(true);
    expect(isOperator("^")).toBe(true);
  });

  it("returns false if a given character is not an operator", () => {
    expect(isOperator("&")).toBe(false);
  });
});

describe("isNumber", () => {
  it("returns true if a given character is a positive number", () => {
    expect(isNumber("1234")).toBe(true);
  });

  it("returns true if a given character is a negative number", () => {
    expect(isNumber("-1234")).toBe(true);
  });

  it("returns true if a given character is a decimal number", () => {
    expect(isNumber("3.14159")).toBe(true);
  });

  it("returns false if the given character is not a number", () => {
    expect(isNumber("a")).toBe(false);
  });
});

describe("processRightBracket", () => {
  it("Pushes result of calling evaluate with stack contents into the output array until it encounters a left bracket", () => {
    const stack = new Stack<string>();
    const output: number[] = [1, 2, 3, 4];

    stack.push("÷");
    stack.push("(");
    stack.push("×");
    stack.push("+");
    stack.push("-");

    processRightBracket(stack, output);

    expect(output).toStrictEqual([1]);
    expect(stack.peek()).toBe("÷");
  });

  it("Leaves the output array unmodified if it has less than 2 entries", () => {
    const stack = new Stack<string>();
    const output: number[] = [];

    stack.push("÷");
    stack.push("(");
    stack.push("×");
    stack.push("+");
    stack.push("-");

    processRightBracket(stack, output);

    expect(output).toStrictEqual([]);
    expect(stack.peek()).toBe("÷");
  });
});

describe("processOperator", () => {
  it("Pushes the given operator to the stack if the stack was initially empty", () => {
    const stack = new Stack<string>();
    const output: number[] = [];

    processOperator("+", stack, output);

    expect(stack.peek()).toBe("+");
  });

  it("Pushes the current operator on the stack if it has a greater precedence than the one at the top of the stack", () => {
    const stack = new Stack<string>();
    const output: number[] = [];

    stack.push("×");

    processOperator("÷", stack, output);

    expect(stack.peek()).toBe("÷");
  });

  it("Pushes the current operator on the stack if the top of the stack is a ( character", () => {
    const stack = new Stack<string>();
    const output: number[] = [];

    stack.push("(");

    processOperator("÷", stack, output);

    expect(stack.peek()).toBe("÷");
  });

  it("Pops operators from the stack and pushes the result of calling evaluate onto the output queue if the current operator has lower precedence", () => {
    const stack = new Stack<string>();
    const output: number[] = [1, 2, 3, 4];

    stack.push("+");
    stack.push("×");
    stack.push("÷");

    processOperator("-", stack, output);

    expect(stack.peek()).toBe("-");
    expect(output).toStrictEqual([2.5]);
  });

  it("Leaves the output array unmodified if it has less than 2 entries", () => {
    const stack = new Stack<string>();
    const output: number[] = [];

    stack.push("+");
    stack.push("×");
    stack.push("÷");

    processOperator("-", stack, output);

    expect(stack.peek()).toBe("-");
    expect(output).toStrictEqual([]);
  });
});

describe("evaluate", () => {
  it("returns early if the output array has less than 2 entries", () => {
    let output: number[] = [];

    evaluate("+", output);

    expect(output).toStrictEqual([]);
  });

  it("Pushes the difference of its entries to the output array when called with the - operator", () => {
    let output: number[] = [1, 2];

    evaluate("-", output);
    expect(output).toStrictEqual([-1]);
  });

  it("Pushes the sum of its entries  to the output array when called with the + operator", () => {
    let output: number[] = [1, 2];

    evaluate("+", output);
    expect(output).toStrictEqual([3]);
  });

  it("Pushes the product of its entries  to the output array when called with the × operator", () => {
    let output: number[] = [1, 2];

    evaluate("×", output);
    expect(output).toStrictEqual([2]);
  });

  it("Pushes the quotient of its entries  to the output array when called with the ÷ operator", () => {
    let output: number[] = [1, 2];

    evaluate("÷", output);
    expect(output).toStrictEqual([0.5]);
  });
});

describe("parseAndEvaluate", () => {
  it("converts an infix expression into Reverse Polish Notation and evaluates it", () => {
    expect(parseAndEvaluate("1 + 1 - 2")).toBe(0);
    expect(parseAndEvaluate("1 + 1 - 2 × 4 + 8 ÷ 2 - 1")).toBe(-3);
  });
});
