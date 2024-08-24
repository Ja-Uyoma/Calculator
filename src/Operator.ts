export type OperatorSymbol = "+" | "-" | "*" | "/";

export const Operators = new Map<OperatorSymbol, number>([
  ["-", 1],
  ["+", 2],
  ["*", 3],
  ["/", 4],
]);
