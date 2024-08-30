import { isNumber, isOperator } from "./Parser";

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
      if (buffer.length > 0) {
        tokens.push(buffer);
        buffer = "";
      }

      continue;
    }

    // Check if the character is a number
    if (isNumber(input[i])) {
      buffer += input[i];
      continue;
    }

    // Check if the character is an operator
    if (isOperator(input[i])) {
      if (buffer.length > 0) {
        tokens.push(buffer);
        buffer = "";
      }

      tokens.push(input[i]);
      continue;
    }

    // If we reach the end of the string,
    // push whatever is in the buffer to the tokens array
    if (i === input.length - 1) {
      if (buffer.length > 0) {
        tokens.push(buffer);
        buffer = "";
      }
    }
  }

  return tokens;
}
