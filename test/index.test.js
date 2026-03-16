/**
 * @jest-environment jsdom
 */
/* eslint-env node, jest */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(() => {
  document.body.innerHTML = html;
  jest.resetModules();
  require("../index.js");
});

test("Add element to the DOM", () => {
  const button = document.querySelector("#simulate-click");
  button.click();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl).not.toBeNull();
  expect(addedEl.textContent).toBe("Button was clicked!");
});

test("Update the DOM", () => {
  const button = document.querySelector("#simulate-click");
  button.click(); // add
  button.click(); // update
  const addedEl = document.querySelector("#added-element");
  expect(addedEl.textContent).toBe("Content updated!");
});

test("Remove an element from the DOM", () => {
  const button = document.querySelector("#simulate-click");
  button.click();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl).not.toBeNull();
  addedEl.remove();
  expect(document.querySelector("#added-element")).toBeNull();
});

test("Form submission with input updates dynamic content", () => {
  const form = document.querySelector("#user-form");
  const input = document.querySelector("#user-input");
  const dynamicContent = document.querySelector("#dynamic-content");
  const errorMessage = document.querySelector("#error-message");

  input.value = "Hello Jest";
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  expect(dynamicContent.textContent).toBe("You submitted: Hello Jest");
  expect(errorMessage.classList.contains("hidden")).toBe(true);
});

test("Display error message on empty input submission", () => {
  const form = document.querySelector("#user-form");
  const input = document.querySelector("#user-input");
  const errorMessage = document.querySelector("#error-message");

  input.value = "";
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  expect(errorMessage.textContent).toBe("Input cannot be empty");
  expect(errorMessage.classList.contains("hidden")).toBe(false);
});
