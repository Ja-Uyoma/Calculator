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
  });

  it("returns false if a given character is not an operator", () => {
    expect(isOperator("&")).toBe(false);
  });
});

describe("isNumber", () => {
  it("returns true if a given character is a number", () => {
    expect(isNumber("1234")).toBe(true);
  });

  it("returns false if the given character is not a number", () => {
    expect(isNumber("a")).toBe(false);
  });
});

describe("processRightBracket", () => {
  it("Pushes stack contents into the output array until it encounters a left bracket", () => {
    const stack = new Stack<string>();
    const output: string[] = [];

    stack.push("1");
    stack.push("(");
    stack.push("2");
    stack.push("3");
    stack.push("4");

    processRightBracket(stack, output);

    expect(output).toEqual(["4", "3", "2"]);
    expect(stack.peek()).toBe("1");
  });
});

describe("processOperator", () => {
  it("Pushes the given operator to the stack if the stack was initially empty", () => {
    const stack = new Stack<string>();
    const output: string[] = [];

    processOperator("+", stack, output);

    expect(stack.peek()).toBe("+");
  });

  it("Pushes the current operator on the stack if it has a greater precedence than the one at the top of the stack", () => {
    const stack = new Stack<string>();
    const output: string[] = [];

    stack.push("×");

    processOperator("÷", stack, output);

    expect(stack.peek()).toEqual("÷");
  });

  it("Pushes the current operator on the stack if the top of the stack is a ( character", () => {
    const stack = new Stack<string>();
    const output: string[] = [];

    stack.push("(");

    processOperator("÷", stack, output);

    expect(stack.peek()).toBe("÷");
  });

  it("Pops operators from the stack onto the output queue if the current operator has lower precedence", () => {
    const stack = new Stack<string>();
    const output: string[] = [];

    stack.push("+");
    stack.push("×");
    stack.push("÷");

    processOperator("-", stack, output);

    expect(stack.peek()).toBe("-");
    expect(output).toEqual(["÷", "×", "+"]);
  });
});

describe("parseAndEvaluate", () => {
  it("converts an infix expression into Reverse Polish Notation and evaluates it", () => {
    expect(parseAndEvaluate("1 + 1 - 2")).toBe(0);
    expect(parseAndEvaluate("1 + 1 - 2 × 4 + 8 ÷ 2 - 1")).toBe(-3);
  });
});

describe("evaluate", () => {
  it("returns early if the output array is empty", () => {
    let output: string[] = [];

    evaluate("+", output);

    expect(output).toEqual([]);
  });
});
