"use strict";

const input = document.querySelector(".input");

/**
 * Update the calculator's display with the value of the button(s) pressed.
 */
export function updateDisplay() {
  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (btn.textContent !== "=") {
        if (input.textContent === "0") {
          input.textContent = btn.textContent;
        } else {
          input.textContent += btn.textContent;
        }
      }
    });
  });
}

/**
 * Reset the display of the calculator to its default state
 */
export function clearDisplay() {
  let clearBtn = document.querySelector(".btn-clear");

  clearBtn.addEventListener("click", () => {
    input.textContent = "0";
  });
}

/**
 * Delete the right-most character present in the calculator's display
 */
export function deleteCharacter() {
  let delBtn = document.querySelector(".btn-delete");

  delBtn.addEventListener("click", () => {
    let str = display.textContent;

    if (str.length > 1) {
      display.textContent = "";
      display.textContent = str.substring(0, str.length - 1);
    } else if (str.length === 1) {
      display.textContent = "0";
    }
  });
}