/**
 * @jest-environment jsdom
 */
/* eslint-env node, jest */

const fs = require("fs");
const path = require("path");

// Load HTML
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(() => {
  document.body.innerHTML = html;
  jest.resetModules();
  require("../index.js");
});

test("Add element to the DOM", () => {
  const addButton = document.querySelector("#simulate-click");
  addButton.click();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl).not.toBeNull();
  expect(addedEl.textContent).toBe("New element added!");
});

test("Remove an element from the DOM", () => {
  const addButton = document.querySelector("#simulate-click");
  const removeButton = document.querySelector("#remove-button");
  addButton.click();
  expect(document.querySelector("#added-element")).not.toBeNull();
  removeButton.click();
  expect(document.querySelector("#added-element")).toBeNull();
});

test("Update the DOM", () => {
  const addButton = document.querySelector("#simulate-click");
  const updateButton = document.querySelector("#update-button");
  addButton.click();
  updateButton.click();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl.textContent).toBe("Content updated!");
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
