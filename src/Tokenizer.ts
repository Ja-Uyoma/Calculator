import { isNumber, isOperator } from "./Parser";
import { TokenSpecification } from "./TokenType";

/**
 * Tokenize a string
 * @param input The string to be tokenized
 * @returns An array of tokens
 */
export function tokenizer(input: string): string[] {
  const tokens: string[] = [];
  let buffer: string = "";

  for (let i = 0; i < input.length; i++) {
    // SKip whitespace characters
    if (input[i] === " ") {
      // If the buffer contains any characters, push them to the tokens array
      // and clear the buffer
      buffer = flushBuffer(buffer, tokens);

      continue;
    }

    // Check if the character is a number
    if (isNumber(input[i])) {
      buffer += input[i];

      if (i === input.length - 1) {
        buffer = flushBuffer(buffer, tokens);
      }

      continue;
    }

    // Check if the character is an operator
    if (isOperator(input[i])) {
      buffer = flushBuffer(buffer, tokens);

      tokens.push(input[i]);
      continue;
    }

    // If we reach the end of the string,
    // push whatever is in the buffer to the tokens array
    if (i === input.length - 1) {
      buffer = flushBuffer(buffer, tokens);
    }
  }

  return tokens;
}

/**
 * Flush the buffer if it's not empty by pushing its contents to the tokens array
 * @param buffer The buffer to be flushd
 * @param tokens The array of tokens
 */
export function flushBuffer(buffer: string, tokens: string[]): string {
  if (buffer.length > 0) {
    tokens.push(buffer);
    buffer = "";
  }

  return buffer;
}

export class Tokenizer {
  /**
   * The expression to be parsed
   */
  private input: string = "";

  /**
   * Keeps track of where we are in a given expression
   */
  private cursor: number = 0;

  /**
   * Create a Tokenizer object with the given input string
   * @param input The expression to be parsed
   */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Determine if we're done tokenising the expression
   * @returns True if we've reached the end of the expression and false otherwise
   */
  hasMoreTokens(): boolean {
    return this.cursor < this.input.length;
  }

  /**
   * Determine the token type of the input string
   * @param regex The regex to match against
   * @param inputSlice The search string
   * @returns The token type or null if there was no match
   */
  match(regex: RegExp, inputSlice: string): string | null {
    const matched = regex.exec(inputSlice);

    if (matched === null) {
      return null;
    }

    this.cursor += matched[0].length;
    return matched[0];
  }

  /**
   * Get the next token in the input expression
   * @returns A key-value pair of the token type and its value, or null if there was none
   */
  getNextToken(): { type: string; value: string } | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const inputSlice = this.input.slice(this.cursor);

    for (const [regex, type] of TokenSpecification) {
      const tokenValue = this.match(regex, inputSlice);

      // If there was no match
      if (tokenValue === null) {
        continue;
      }

      // If we matched with whitespace, proceed to the next token
      if (type === null) {
        return this.getNextToken();
      }

      return { type, value: tokenValue };
    }

    throw new SyntaxError(`Unexpected token: "${inputSlice[0]}`);
  }
}
