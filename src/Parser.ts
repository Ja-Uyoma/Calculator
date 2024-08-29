import { Stack } from "./Stack";
import { operators, Operators } from "./Operator";
import { add, divide, multiply, subtract } from "./MathOperations";

/**
 * Determine if a given character is an operator or not
 * @param expr The search string
 * @returns True if the given character is an operator, false otherwise
 */
export function isOperator(expr: string): boolean {
  return expr === "-" || expr === "+" || expr === "×" || expr === "÷";
}

/**
 * Determine if the given character is a number or not
 * @param expr The character to be tested
 * @returns True if the given character is a number, false otherwise
 */
export function isNumber(expr: string): boolean {
  const result = parseFloat(expr);

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
    operators[stack.peek()].precedence > operators[operator].precedence
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
  const stack = new Stack<string>();
  const output: string[] = [];

  for (let char of expr) {
    if (char == " ") {
      continue;
    } else if (isNumber(char)) {
      output.push(char);
    } else if (isOperator(char)) {
      processOperator(char, stack, output);
    } else if (char == "(") {
      stack.push(char);
    } else if (char == ")") {
      processRightBracket(stack, output);
    }
  }

  while (!stack.empty()) {
    output.push(stack.pop());
  }

  return output;
}

/**
 * Evaluate an arithmetic expression and return the result
 * @param expr An arithmetic expression in postfix (or Reverse Polish) notation
 * @returns The result of evaluating the expression
 */
export function evaluate(expr: string[]): number {
  const stack = new Stack<number>();

  for (let token of expr) {
    if (!isOperator(token)) {
      stack.push(parseInt(token));
      continue;
    } else {
      const second = stack.pop();
      const first = stack.pop();

      if (token === "-") {
        stack.push(subtract(first, second));
      } else if (token === "+") {
        stack.push(add(first, second));
      } else if (token === "×") {
        stack.push(multiply(first, second));
      } else if (token === "÷") {
        stack.push(divide(first, second));
      }
    }
  }

  return stack.peek();
}
