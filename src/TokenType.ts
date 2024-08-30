interface TokenTypeInterface {
  NUMBER: string;
  ADDITION: string;
  SUBTRACTION: string;
  MULTIPLICATION: string;
  DIVISION: string;
  EXPONENTIATION: string;
  LEFT_PAREN: string;
  RIGHT_PAREN: string;
}

export const TokenTypes: TokenTypeInterface = {
  NUMBER: "NUMBER",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "×",
  DIVISION: "÷",
  EXPONENTIATION: "^",
  LEFT_PAREN: "(",
  RIGHT_PAREN: ")",
};
