/**
 * @jest-environment jsdom
 */

/* eslint-env node, jest */
/* eslint-disable no-undef */

const fs = require("fs");
const path = require("path");

// Load HTML template
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(() => {
  document.body.innerHTML = html;
  jest.resetModules(); // Reload JS module for fresh DOM
  require("../index.js"); // Load frontend JS
});

test("simulate-click button updates dynamic content", () => {
  const button = document.querySelector("#simulate-click");
  const dynamicContent = document.querySelector("#dynamic-content");

  button.click();

  expect(dynamicContent.textContent).toBe("Button was clicked!");
});

test("form submission with empty input shows error", () => {
  const form = document.querySelector("#user-form");
  const errorMessage = document.querySelector("#error-message");

  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  expect(errorMessage.textContent).toBe("Input cannot be empty");
  expect(errorMessage.classList.contains("hidden")).toBe(false);
});

test("form submission with input updates dynamic content", () => {
  const form = document.querySelector("#user-form");
  const input = document.querySelector("#user-input");
  const dynamicContent = document.querySelector("#dynamic-content");
  const errorMessage = document.querySelector("#error-message");

  input.value = "Hello Jest";
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  expect(dynamicContent.textContent).toBe("You submitted: Hello Jest");
  expect(errorMessage.classList.contains("hidden")).toBe(true);
});
