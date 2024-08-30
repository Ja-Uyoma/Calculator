import { describe, expect, it } from "vitest";
import { flushBuffer, tokenizer } from "./Tokenizer";

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
