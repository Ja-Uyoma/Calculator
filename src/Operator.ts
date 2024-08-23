export type Operator = "+" | "-" | "*" | "/";

export const OperatorPrecedence = new Map<Operator, number>([
  ["-", 1],
  ["+", 2],
  ["*", 3],
  ["/", 4],
]);
