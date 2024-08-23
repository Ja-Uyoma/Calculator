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
