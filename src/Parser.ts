/**
 * Trim the whitespace from a given string
 * @param expr The string from which whitespace is to be eliminated
 * @returns A string containing no whitespace
 */
export function trimWhitespace(expr: string): string {
  let output = "";

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == " ") {
      continue;
    } else {
      output += expr[i];
    }
  }

  return output;
}
