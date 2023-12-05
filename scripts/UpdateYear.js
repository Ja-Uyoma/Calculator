"use strict";

export function updateYear() {
  let field = document.querySelector("span.year");
  let currentYear = new Date().getFullYear();
  field.textContent = currentYear.toString();
}
