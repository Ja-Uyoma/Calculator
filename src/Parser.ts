import { Stack } from "./Stack";
import { Operators } from "./Operator";

/**
 * Trim the whitespace from a given string
 * @param expr The string from which whitespace is to be eliminated
 * @returns A string containing no whitespace
 */
export function trimWhitespace(expr: string): string {
  let output = "";

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === " ") {
      continue;
    } else {
      output += expr[i];
    }
  }

  return output;
}

/**
 * Determine if a given character is an operator or not
 * @param expr The search string
 * @returns True if the given character is an operator, false otherwise
 */
export function isOperator(expr: string): boolean {
  return (
    expr.includes("+") ||
    expr.includes("-") ||
    expr.includes("*") ||
    expr.includes("/")
  );
}

/**
 * Determine if the given character is a number or not
 * @param expr The character to be tested
 * @returns True if the given character is a number, false otherwise
 */
export function isNumber(expr: string): boolean {
  const result = parseInt(expr);

  if (isNaN(result)) {
    return false;
  }

  return true;
}

/**
 * Handle parsing whenever an operator is encountered
 * @param operator The current operator in the expression
 * @param stack The stack of operator tokens
 * @param output The output expression
 */
export function processOperator(
  operator: string,
  stack: Stack<string>,
  output: string[]
) {
  while (
    !stack.empty() &&
    Operators.get(stack.peek())! > Operators.get(operator)!
  ) {
    output.push(stack.pop());
  }

  stack.push(operator);
}

/**
 * Handle a right bracket encounter
 * @param stack The stack containing tokens
 * @param output The array containing the result of calling this function
 */
export function processRightBracket(stack: Stack<string>, output: string[]) {
  while (!stack.empty() && stack.peek() !== "(") {
    output.push(stack.pop());
  }

  stack.pop();
}

/**
 * Parse an arithmetic expression from infix form to Reverse Polish Notation
 * @param expr The mathematical expression in infix form to be parsed
 * @returns The expression in Reverse Polish Notation
 */
export function parse(expr: string): string[] {
  const input = trimWhitespace(expr);
  const stack = new Stack<string>();
  const output: string[] = [];

  for (let i = 0; i < input.length; i++) {
    if (isNumber(input[i])) {
      output.push(input[i]);
    } else if (isOperator(input[i])) {
      processOperator(input[i], stack, output);
    } else if (input[i] == "(") {
      stack.push(input[i]);
    } else if (input[i] == ")") {
      processRightBracket(stack, output);
    }
  }

  while (!stack.empty()) {
    output.push(stack.pop());
  }

  return output;
}
