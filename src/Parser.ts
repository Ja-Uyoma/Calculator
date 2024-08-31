import { Stack } from "./Stack";
import { Operators } from "./Operator";
import { add, divide, multiply, subtract } from "./MathOperations";
import { Tokenizer } from "./Tokenizer";

/**
 * Determine if a given character is an operator or not
 * @param expr The search string
 * @returns True if the given character is an operator, false otherwise
 */
export function isOperator(expr: string): boolean {
  return Object.keys(Operators).includes(expr);
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
  output: number[]
) {
  while (
    !stack.empty() &&
    stack.peek() != "(" &&
    (Operators[stack.peek()].precedence > Operators[operator].precedence ||
      (Operators[stack.peek()].precedence === Operators[operator].precedence &&
        Operators[operator].associativity === "left"))
  ) {
    evaluate(stack.pop(), output);
  }

  stack.push(operator);
}

/**
 * Handle a right bracket encounter
 * @param stack The stack containing tokens
 * @param output The array containing the result of calling this function
 */
export function processRightBracket(stack: Stack<string>, output: number[]) {
  while (!stack.empty() && stack.peek() !== "(") {
    evaluate(stack.pop(), output);
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
  const output: number[] = [];

  const processToken = (token: string) => {
    if (isNumber(token)) {
      output.push(parseFloat(token));
    } else if (isOperator(token)) {
      processOperator(token, stack, output);
    } else if (token == "(") {
      stack.push(token);
    } else if (token == ")") {
      processRightBracket(stack, output);
    } else {
      throw new Error(`Invalid token: ${token}`);
    }
  };

  const tokenizer = new Tokenizer(expr);
  let token = null;

  while ((token = tokenizer.getNextToken())) {
    processToken(token.value);
  }

  while (!stack.empty() && stack.peek() != "(") {
    evaluate(stack.pop(), output);
  }

  return output[0];
}

/**
 * Perform an operation depending on the given operator
 * @param operator The arithmetic operator
 * @param output A buffer containing the intermediate results
 */
export function evaluate(operator: string, output: number[]) {
  if (output.length < 2) {
    return;
  }

  const right = output.pop()!;
  const left = output.pop()!;

  if (operator === "-") {
    output.push(subtract(left, right));
  } else if (operator === "+") {
    output.push(add(left, right));
  } else if (operator === "×") {
    output.push(multiply(left, right));
  } else if (operator === "÷") {
    output.push(divide(left, right));
  } else if (operator === "^") {
    output.push(left ** right);
  } else {
    throw new Error(`Invalid operation: ${operator}`);
  }
}
