import { Stack } from "./Stack";
import { Operators } from "./Operator";
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
    stack.peek() != "(" &&
    (Operators[stack.peek()].precedence > Operators[operator].precedence ||
      (Operators[stack.peek()].precedence === Operators[operator].precedence &&
        Operators[operator].associativity === "left"))
  ) {
    // output.push(stack.pop());
    const operator = stack.pop();

    const right = parseFloat(output.pop()!);
    const left = parseFloat(output.pop()!);

    if (operator === "-") {
      output.push(subtract(left, right).toString());
    } else if (operator === "+") {
      output.push(add(left, right).toString());
    } else if (operator === "×") {
      output.push(multiply(left, right).toString());
    } else if (operator === "÷") {
      output.push(divide(left, right).toString());
    } else if (operator === "^") {
      output.push((left ** right).toString());
    } else {
      throw new Error(`Invalid operation: ${operator}`);
    }
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
    // output.push(stack.pop());
    const operator = stack.pop();

    const right = parseFloat(output.pop()!);
    const left = parseFloat(output.pop()!);

    if (operator === "-") {
      output.push(subtract(left, right).toString());
    } else if (operator === "+") {
      output.push(add(left, right).toString());
    } else if (operator === "×") {
      output.push(multiply(left, right).toString());
    } else if (operator === "÷") {
      output.push(divide(left, right).toString());
    } else if (operator === "^") {
      output.push((left ** right).toString());
    } else {
      throw new Error(`Invalid operation: ${operator}`);
    }
  }

  stack.pop();
}

/**
 * Parse an arithmetic expression from infix form to Reverse Polish Notation and evaluate it
 * @param expr The mathematical expression in infix form to be parsed
 * @returns The result of evaluating the expression
 */
export function parseAndEvaluate(expr: string): number {
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
    } else {
      throw new Error(`Invalid token: ${char}`);
    }
  }

  while (!stack.empty() && stack.peek() != "(") {
    // output.push(stack.pop());
    const operator = stack.pop();

    const right = parseFloat(output.pop()!);
    const left = parseFloat(output.pop()!);

    if (operator === "-") {
      output.push(subtract(left, right).toString());
    } else if (operator === "+") {
      output.push(add(left, right).toString());
    } else if (operator === "×") {
      output.push(multiply(left, right).toString());
    } else if (operator === "÷") {
      output.push(divide(left, right).toString());
    } else if (operator === "^") {
      output.push((left ** right).toString());
    } else {
      throw new Error(`Invalid operation: ${operator}`);
    }
  }

  return parseFloat(output[0]);
}
