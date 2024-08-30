import { isNumber, isOperator } from "./Parser";

/**
 * Tokenize a string
 * @param input The string to be tokenized
 * @returns An array of tokens
 */
export function tokenizer(input: string, buffer: string): string[] {
  const tokens: string[] = [];

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
