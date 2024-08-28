export interface Operator {
  [key: string]: {
    precedence: number;
    associativity: string;
  };
}

export const Operators = new Map<string, number>([
  ["-", 2],
  ["+", 2],
  ["×", 3],
  ["÷", 4],
]);

/* Operators and their precedence and associativity */
export const operators: Operator = {
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
