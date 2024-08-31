interface TokenTypeInterface {
  NUMBER: string;
  IDENTIFIER: string;
  ADDITION: string;
  SUBTRACTION: string;
  MULTIPLICATION: string;
  DIVISION: string;
  EXPONENTIATION: string;
  LPAREN: string;
  RPAREN: string;
}

export const TokenTypes: TokenTypeInterface = {
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "×",
  DIVISION: "÷",
  EXPONENTIATION: "^",
  LPAREN: "(",
  RPAREN: ")",
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
  [/^\)/, TokenTypes.RPAREN],
];
