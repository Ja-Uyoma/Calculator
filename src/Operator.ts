export interface Operator {
  symbol: string;
  precedence: number;
}

export const Operators = new Map<string, number>([
  ["-", 1],
  ["+", 2],
  ["*", 3],
  ["/", 4],
]);
