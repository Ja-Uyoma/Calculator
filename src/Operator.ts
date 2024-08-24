export interface Operator {
  symbol: string;
  precedence: number;
}

export const Operators = new Map<OperatorSymbol, number>([
  ["-", 1],
  ["+", 2],
  ["*", 3],
  ["/", 4],
]);
