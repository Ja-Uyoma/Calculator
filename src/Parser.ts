import { Stack } from "./Stack";
import { Operators } from "./Operator";
import { add, divide, multiply, subtract } from "./MathOperations";

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
    expr.includes("×") ||
    expr.includes("/") ||
    expr.includes("÷")
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
  const stack = new Stack<string>();
  const output: string[] = [];

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == " ") {
      continue;
    } else if (isNumber(expr[i])) {
      output.push(expr[i]);
    } else if (isOperator(expr[i])) {
      processOperator(expr[i], stack, output);
    } else if (expr[i] == "(") {
      stack.push(expr[i]);
    } else if (expr[i] == ")") {
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

  for (let i = 0; i < expr.length; i++) {
    if (!isOperator(expr[i])) {
      stack.push(parseInt(expr[i]));
      continue;
    } else {
      const second = stack.pop();
      const first = stack.pop();

      if (expr[i] === "-") {
        stack.push(subtract(first, second));
      } else if (expr[i] === "+") {
        stack.push(add(first, second));
      } else if (expr[i] === "*" || expr[i] === "×") {
        stack.push(multiply(first, second));
      } else if (expr[i] === "/" || expr[i] === "÷") {
        stack.push(divide(first, second));
      }
    }
  }

  return stack.peek();
}
