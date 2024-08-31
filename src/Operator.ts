export interface Operator {
  [key: string]: {
    precedence: number;
    associativity: string;
  };
}

/* Operators and their precedence and associativity */
export const Operators: Operator = {
  u: {
    precedence: 4,
    associativity: "right",
  },
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
