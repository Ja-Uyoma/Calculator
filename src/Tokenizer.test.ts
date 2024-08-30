import { describe, expect, it } from "vitest";
import { flushBuffer } from "./Tokenizer";

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
