export interface Operator {
  symbol: string;
  precedence: number;
}

export const Operators: Operator[] = [
  { symbol: "-", precedence: 1 },
  { symbol: "+", precedence: 2 },
  { symbol: "*", precedence: 3 },
  { symbol: "/", precedence: 4 },
];
