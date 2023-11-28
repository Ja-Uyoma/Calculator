"use strict";

class IllegalOperationException extends Error {
    /**
     * Get the error message describing the exception that occured
     * @returns {string} An message describing the error that occured
     */
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
        if (display.textContent === "0") {
            display.textContent = btn.textContent;
        }
        else {
            display.textContent += btn.textContent;
        }
    });
});

let clearBtn = document.querySelector(".btn-clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "0";
});

let delBtn = document.querySelector(".btn-delete");
delBtn.addEventListener("click", () => {
    let string = display.textContent;
    
    if (string.length > 1) {
        display.textContent = "";
        display.textContent = string.substring(0, string.length - 1);    
    }
});

function updateYear() {
    let field = document.querySelector("span.year");
    const currentYear = new Date().getFullYear();

    field.textContent = currentYear.toString();
}

updateYear();