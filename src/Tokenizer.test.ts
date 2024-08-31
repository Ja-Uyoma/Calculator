import { describe, expect, it } from "vitest";
import { flushBuffer, Tokenizer, tokenizer } from "./Tokenizer";

describe("flushBuffer", () => {
  it("Is a no-op if the buffer is empty", () => {
    let buffer: string = "";
    let tokens: string[] = [];

    buffer = flushBuffer(buffer, tokens);

    expect(buffer).toBe("");
    expect(tokens).toStrictEqual([]);
  });

  it("Flushes the buffer if it's not empty", () => {
    let buffer: string = "1 + 1 - 2";
    let tokens: string[] = [];

    buffer = flushBuffer(buffer, tokens);

    expect(buffer).toEqual("");
    expect(tokens).toStrictEqual(["1 + 1 - 2"]);
  });
});

describe("tokenizer", () => {
  it("Handles numeric input", () => {
    const input: string = "1111";

    const tokens: string[] = tokenizer(input);

    expect(tokens).toStrictEqual(["1111"]);
  });

  it("Handles operator input", () => {
    const input: string = "×";

    const tokens: string[] = tokenizer(input);

    expect(tokens).toStrictEqual(["×"]);
  });

  it("Handles whitespace", () => {
    const input: string = " ";

    const tokens: string[] = tokenizer(input);

    expect(tokens).toStrictEqual([]);
  });

  it("Handles expressions", () => {
    const input: string = "1 + 1 - 2 × 4 ÷ 8 + 10";

    const tokens: string[] = tokenizer(input);

    expect(tokens).toStrictEqual([
      "1",
      "+",
      "1",
      "-",
      "2",
      "×",
      "4",
      "÷",
      "8",
      "+",
      "10",
    ]);
  });
});

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
});
