export interface Operator {
  symbol: string;
  precedence: number;
}

export const Operators = new Map<string, number>([
  ["-", 1],
  ["+", 2],
  ["*", 3],
  ["×", 3],
  ["/", 4],
  ["÷", 4],
]);

/* Operators and their precedence and associativity */
export const operators = {
  "^": {
    precedence: 4,
    associativity: "right",
  },
  "×": {
    precedence: 3,
    associativity: "left",
  },
  "÷": {
    precedence: 3,
    associativity: "left",
  },
  "+": {
    precedence: 2,
    associativity: "left",
  },
  "-": {
    precedence: 2,
    associativity: "left",
  },
};
