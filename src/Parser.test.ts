import { trimWhitespace, isOperator } from "./Parser";

import { describe, expect, it } from "vitest";

describe("trimWhitespace", () => {
  it("trims whitespace in the middle of a string", () => {
    const input = "The quick brown fox jumped over the lazy dog";
    const output = trimWhitespace(input);
    expect(output).toBe("Thequickbrownfoxjumpedoverthelazydog");
  });

  it("trims whitespace at the beginning of a string", () => {
    const input = " The quick";
    const output = trimWhitespace(input);
    expect(output).toBe("Thequick");
  });

  it("trims whitespace at the end of a string", () => {
    const input = "The quick ";
    const output = trimWhitespace(input);
    expect(output).toBe("Thequick");
  });
});

describe("isOperator", () => {
  it("returns true if a given character is an operator", () => {
    expect(isOperator("+")).toBe(true);
    expect(isOperator("-")).toBe(true);
    expect(isOperator("*")).toBe(true);
    expect(isOperator("/")).toBe(true);
  });

  it("returns false if a given character is not an operator", () => {
    expect(isOperator("&")).toBe(false);
  });
});
