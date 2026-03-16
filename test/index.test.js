/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(() => {
  document.body.innerHTML = html;
  jest.resetModules();
  require("../index.js");
});

test("Add element to the DOM", () => {
  window.addElement();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl).not.toBeNull();
  expect(addedEl.textContent).toBe("Button was clicked!");
});

test("Update the DOM", () => {
  window.addElement();
  window.updateElement();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl.textContent).toBe("Content updated!");
});

test("Remove an element from the DOM", () => {
  window.addElement();
  const addedEl = document.querySelector("#added-element");
  expect(addedEl).not.toBeNull();
  window.removeElement();
  expect(document.querySelector("#added-element")).toBeNull();
});

test("Form submission with input updates dynamic content", () => {
  const input = document.querySelector("#user-input");
  const dynamicContent = document.querySelector("#dynamic-content");
  const errorMessage = document.querySelector("#error-message");

  input.value = "Hello Jest";
  window.submitForm();

  expect(dynamicContent.textContent).toBe("You submitted: Hello Jest");
  expect(errorMessage.classList.contains("hidden")).toBe(true);
});

test("Display error message on empty input submission", () => {
  const input = document.querySelector("#user-input");
  const errorMessage = document.querySelector("#error-message");

  input.value = "";
  window.submitForm();

  expect(errorMessage.textContent).toBe("Input cannot be empty");
  expect(errorMessage.classList.contains("hidden")).toBe(false);
});
