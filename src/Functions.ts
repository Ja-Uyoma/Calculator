/**
 * List of supported functions
 */
const FunctionList = ["sin", "cos", "tan"];

/**
 * Determine if the given token is a supported function or not
 *
 * @param token The name of the possible function under test
 * @returns True if the token is a function and false otherwise
 */
export function isFunction(token: string): boolean {
  return FunctionList.includes(token.toLowerCase());
}
