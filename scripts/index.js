"use strict";

class IllegalOperationException extends Error {
    what() {
        return this.message;
    }
}

/**
 * Add two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The sum of the two numbers
 */
function add(first, second) {
    return first + second;
}

/**
 * Subtract two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The difference of the two numbers
 */
function subtract(first, second) {
    return first - second;
}

/**
 * Multiply two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The product of the two numbers
 */
function multiply(first, second) {
    return first * second;
}

/**
 * Divide two numbers
 * @param {number} first The first number in the operation
 * @param {number} second The second number in the operation
 * @returns The quotient of the two numbers
 */
function divide(first, second) {
    if (second === 0) {
        throw new IllegalOperationException("Division by zero is undefined");
    }

    return first / second;
}

let firstOperand = null;
let secondOperand = null;
let operator = null;

function operate(infixOperator, first, second) {
    if (infixOperator === "+") {
        return add(first, second);
    }
    else if (infixOperator === "-") {
        return subtract(first, second);
    }
    else if (infixOperator === "*") {
        return multiply(first, second);
    }
    else if (infixOperator === "/") {
        let outcome = 1;

        try {
            outcome = divide(first, second);
        }
        catch (err) {
            console.error(err.what());
            outcome = null;
        }

        return outcome;
    }
}

let display = document.querySelector("div.display > p");
let buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        display.textContent += btn.textContent;
    });
});

let clearBtn = document.querySelector(".btn-clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "0";
});