import {
  isOperator,
  isNumber,
  processRightBracket,
  processOperator,
  parseAndEvaluate,
  evaluate,
  tokenIsNullOrLeftParenOrAnOperator,
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
    expect(isOperator("u")).toBe(true);
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
  it("Returns the difference of its entries when called with the - operator", () => {
    let output: number[] = [1, 2];

    expect(evaluate("-", output)).toBe(-1);
  });

  it("Returns the sum of its entries when called with the + operator", () => {
    let output: number[] = [1, 2];

    expect(evaluate("+", output)).toBe(3);
  });

  it("Returns the product of its entries when called with the × operator", () => {
    let output: number[] = [1, 2];

    expect(evaluate("×", output)).toBe(2);
  });

  it("Returns the quotient of its entries when called with the ÷ operator", () => {
    let output: number[] = [1, 2];

    expect(evaluate("÷", output)).toBe(0.5);
  });
});

describe("parseAndEvaluate", () => {
  it("evaluates a mathematical expression in infix form", () => {
    expect(parseAndEvaluate("1 + 1 - 2")).toBe(0);
    expect(parseAndEvaluate("1 + 1 - 2 × 4 + 8 ÷ 2 - 1")).toBe(-3);
    expect(parseAndEvaluate("1 + 1 - 2 × (4 + 8) ÷ (2 - 1)")).toBe(-22);
  });

  it("evaluates functions", () => {
    expect(parseAndEvaluate("sin(0)")).toBe(0);
    expect(parseAndEvaluate("cos(0)")).toBe(0);
    expect(parseAndEvaluate("tan(0)")).toBe(0);
  });
});

describe("tokenIsNullOrLeftParenOrAnOperator", () => {
  it("returns true if the token is null", () => {
    expect(tokenIsNullOrLeftParenOrAnOperator(null)).toBe(true);
  });

  it("returns true if the token is an opening parenthesis", () => {
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "(", value: "(" })).toBe(
      true
    );
  });

  it("returns true if the token is an operator", () => {
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "^", value: "^" })).toBe(
      true
    );
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "×", value: "×" })).toBe(
      true
    );
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "÷", value: "÷" })).toBe(
      true
    );
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "+", value: "+" })).toBe(
      true
    );
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "-", value: "-" })).toBe(
      true
    );
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: "u", value: "u" })).toBe(
      true
    );
  });

  it("returns false otherwise", () => {
    expect(tokenIsNullOrLeftParenOrAnOperator({ type: ")", value: ")" })).toBe(
      false
    );
    expect(
      tokenIsNullOrLeftParenOrAnOperator({ type: "NUMBER", value: "4" })
    ).toBe(false);
    expect(
      tokenIsNullOrLeftParenOrAnOperator({ type: "IDENTIFIER", value: "sin" })
    ).toBe(false);
  });
});
