import { describe, expect, it } from "vitest";
import {Tokenizer } from "./Tokenizer";

describe("Tokenizer", () => {
  it("hasMoreTokens correctly gauges the presence of tokens in the input string", () => {
    let tokenizer = new Tokenizer("");
    expect(tokenizer.hasMoreTokens()).toBe(false);

    tokenizer = new Tokenizer("1 + 2 + 3");
    expect(tokenizer.hasMoreTokens()).toBe(true);
  });

  it("match correctly matches against whitespace input", () => {
    let tokenizer = new Tokenizer("");
    expect(tokenizer.match(/^\s+/, " ")).toBe(" ");
  });

  it("match correctly matches against numeric input", () => {
    let tokenizer = new Tokenizer("");
    expect(tokenizer.match(/^(?:\d+(:?\.\d*)?|\.\d+)/, "2")).toBe("2");
    expect(tokenizer.match(/^(?:\d+(:?\.\d*)?|\.\d+)/, "2.2")).toBe("2.2");
    expect(tokenizer.match(/^(?:\d+(:?\.\d*)?|\.\d+)/, "-2")).toBe(null);
  });

  it("match correctly matches against operators", () => {
    let tokenizer = new Tokenizer("");

    expect(tokenizer.match(/^\-/, "-")).toBe("-");
    expect(tokenizer.match(/^\+/, "+")).toBe("+");
    expect(tokenizer.match(/^\×/, "×")).toBe("×");
    expect(tokenizer.match(/^\÷/, "÷")).toBe("÷");
    expect(tokenizer.match(/^\^/, "^")).toBe("^");
  });

  it("match correctly matches against parentheses", () => {
    let tokenizer = new Tokenizer("");

    expect(tokenizer.match(/^\(/, "(")).toBe("(");
    expect(tokenizer.match(/^\)/, ")")).toBe(")");
  });

  it("getNextToken returns null if there are no tokens left", () => {
    let tokenizer = new Tokenizer("");
    expect(tokenizer.getNextToken()).toBe(null);
  });

  it("getNextToken returns the next token in the input expression", () => {
    let tokenizer = new Tokenizer("1 + 2");
    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "NUMBER",
      value: "1",
    });
    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "+",
      value: "+",
    });
    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "NUMBER",
      value: "2",
    });
  });

  it("correctly tokenizes expressions containing identifiers", () => {
    let tokenizer = new Tokenizer("sin(2)");

    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "IDENTIFIER",
      value: "sin",
    });

    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "(",
      value: "(",
    });

    expect(tokenizer.getNextToken()).toStrictEqual({
      type: "NUMBER",
      value: "2",
    });

    expect(tokenizer.getNextToken()).toStrictEqual({
      type: ")",
      value: ")",
    });
  });
});
