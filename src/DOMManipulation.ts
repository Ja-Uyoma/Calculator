import { evaluate, parse } from "./Parser";

const input: HTMLDivElement | null = document.querySelector(".input");

/**
 * Update the calculator's display with the value of the button(s) pressed.
 */
export function updateDisplay() {
  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.textContent !== "=") {
        if (input && input.textContent === "0") {
          input.textContent = btn.textContent;
        } else if (input?.textContent) {
          input.textContent += btn.textContent;
        }
      } else {
        const expr = input?.textContent;
        let result = 0;

        if (expr) {
          const tokens = parse(expr);
          result = evaluate(tokens);
        }

        if (input) {
          input.textContent = result.toString();
        }
      }
    });
  });
}

/**
 * Reset the display of the calculator to its default state
 */
export function clearDisplay() {
  let clearBtn: HTMLButtonElement | null = document.querySelector(".btn-clear");

  clearBtn?.addEventListener("click", () => {
    if (input) {
      input.textContent = "0";
    }
  });
}

/**
 * Delete the right-most character present in the calculator's display
 */
export function deleteCharacter() {
  let delBtn: HTMLButtonElement | null = document.querySelector(".btn-delete");

  delBtn?.addEventListener("click", () => {
    const str = input?.textContent;

    if (str && str.length > 1) {
      input.textContent = "";
      input.textContent = str.substring(0, str.length - 1);
    } else if (str && str.length === 1) {
      input.textContent = "0";
    }
  });
}
