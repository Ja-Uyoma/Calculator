import { describe, expect, it } from "vitest";
import { isFunction } from "./Functions";

describe("isFunction", () => {
  it("Returns true for supported functions", () => {
    expect(isFunction("sin")).toBe(true);
    expect(isFunction("cos")).toBe(true);
    expect(isFunction("tan")).toBe(true);
  });

  it("Returns false for unsupported functions or otherwise erroneous input", () => {
    expect(isFunction("sinh")).toBe(false);
    expect(isFunction("abababs")).toBe(false);
  });
});
