import IllegalOperationException from "./IllegalOperationException.ts";

/**
 * Add two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The sum of the two numbers
 */
function add(first: number, second: number): number {
  return first + second;
}

/**
 * Subtract two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The difference of the two numbers
 */
function subtract(first: number, second: number): number {
  return first - second;
}

/**
 * Multiply two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The product of the two numbers
 */
function multiply(first: number, second: number): number {
  return first * second;
}

/**
 * Divide two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The quotient of the two numbers
 */
function divide(first: number, second: number): number {
  if (second === 0) {
    throw new IllegalOperationException("Division by zero is undefined");
  }

  return first / second;
}

export { add, subtract, multiply, divide };
