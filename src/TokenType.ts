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

type TokenSpecType = [RegExp, string | null];

export const TokenSpecification: TokenSpecType[] = [
  [/^\s+/, null],
  [/^\d+/, TokenTypes.NUMBER],
  [/^\+/, TokenTypes.ADDITION],
  [/^\-/, TokenTypes.SUBTRACTION],
  [/^\×/, TokenTypes.MULTIPLICATION],
  [/^\÷/, TokenTypes.DIVISION],
  [/^\^/, TokenTypes.EXPONENTIATION],
  [/^\(/, TokenTypes.LEFT_PAREN],
  [/^\)/, TokenTypes.RIGHT_PAREN],
];
