"use strict";

import { updateYear } from "./UpdateYear.js";
import { add, subtract, multiply, divide } from "./MathOperations.js";
import {
  updateDisplay,
  clearDisplay,
  deleteCharacter,
} from "./DOMManipulation.js";

updateDisplay();
clearDisplay();
deleteCharacter();

/**
 * Determine an operation to perform and execute it
 * @param {string} infixOperator The operation to perform
 * @param {number} first The first argument to the operator
 * @param {number} second The second argument to the operator
 * @returns The result of performing the specified operation
 */
function operate(infixOperator, first, second) {
  if (infixOperator === "+") {
    return add(first, second);
  } else if (infixOperator === "-") {
    return subtract(first, second);
  } else if (infixOperator === "*") {
    return multiply(first, second);
  } else if (infixOperator === "/") {
    let outcome = 1;

    try {
      outcome = divide(first, second);
    } catch (err) {
      console.error(err.what());
      outcome = null;
    }

    return outcome;
  }
}

updateYear();
