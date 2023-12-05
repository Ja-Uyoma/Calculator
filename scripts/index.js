"use strict";

import { add, subtract, multiply, divide } from "./MathOperations";

let firstOperand = null;
let secondOperand = null;
let operator = null;

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

let expr = "";
let display = document.querySelector("div.display > p");
let buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display.textContent === "0") {
      display.textContent = btn.textContent;
    } else {
      display.textContent += btn.textContent;
    }

    expr = display.textContent;
  });
});

let clearBtn = document.querySelector(".btn-clear");
clearBtn.addEventListener("click", () => {
  display.textContent = "0";
  expr = "0";
});

let delBtn = document.querySelector(".btn-delete");
delBtn.addEventListener("click", () => {
  let string = display.textContent;

  if (string.length > 1) {
    display.textContent = "";
    display.textContent = string.substring(0, string.length - 1);
  }

  expr = display.textContent;
});

function updateYear() {
  let field = document.querySelector("span.year");
  const currentYear = new Date().getFullYear();

  field.textContent = currentYear.toString();
}

updateYear();
