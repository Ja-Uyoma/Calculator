interface TokenTypeInterface {
  NUMBER: string;
  ADDITION: string;
  SUBTRACTION: string;
  MULTIPLICATION: string;
  DIVISION: string;
  EXPONENTIATION: string;
  LPAREN: string;
  RIGHT_PAREN: string;
}

export const TokenTypes: TokenTypeInterface = {
  NUMBER: "NUMBER",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "×",
  DIVISION: "÷",
  EXPONENTIATION: "^",
  LPAREN: "(",
  RIGHT_PAREN: ")",
};

type TokenSpecType = [RegExp, string | null];

export const TokenSpecification: TokenSpecType[] = [
  [/^\s+/, null],
  [/^(?:\d+(:?\.\d*)?|\.\d+)/, TokenTypes.NUMBER],
  [/^\+/, TokenTypes.ADDITION],
  [/^\-/, TokenTypes.SUBTRACTION],
  [/^\×/, TokenTypes.MULTIPLICATION],
  [/^\÷/, TokenTypes.DIVISION],
  [/^\^/, TokenTypes.EXPONENTIATION],
  [/^\(/, TokenTypes.LPAREN],
  [/^\)/, TokenTypes.RIGHT_PAREN],
];
