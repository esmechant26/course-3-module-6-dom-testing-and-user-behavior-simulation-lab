/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

// Load HTML template
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

beforeAll(() => {
  document.body.innerHTML = html;

  // Load the main JS
  require("../index.js");

  // Fire DOMContentLoaded so event listeners attach
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

beforeEach(() => {
  // Reset dynamic content and error message before each test
  document.getElementById("dynamic-content").innerHTML = "";
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
});

/* ======================
   Step 1: Set up Testing Environment
   Check that key elements exist
====================== */
describe("Step 1: DOM Elements Exist", () => {
  test("button and form elements exist", () => {
    expect(document.getElementById("simulate-click")).not.toBeNull();
    expect(document.getElementById("user-form")).not.toBeNull();
    expect(document.getElementById("user-input")).not.toBeNull();
    expect(document.getElementById("dynamic-content")).not.toBeNull();
    expect(document.getElementById("error-message")).not.toBeNull();
  });
});

/* ======================
   Step 2: Simulate User Behavior
   Check button click adds/updates DOM
====================== */
describe("Step 2: Simulate Button Click", () => {
  test("first click adds element", () => {
    const button = document.getElementById("simulate-click");
    button.click();

    const addedEl = document.getElementById("added-element");
    expect(addedEl).not.toBeNull();
    expect(addedEl.textContent).toBe("Button was clicked!");
  });

  test("second click updates element", () => {
    const button = document.getElementById("simulate-click");
    button.click(); // add
    button.click(); // update

    const addedEl = document.getElementById("added-element");
    expect(addedEl.textContent).toBe("Content updated!");
  });
});

/* ======================
   Step 3: Write Tests for DOM Elements
   Validate form submission behavior
====================== */
describe("Step 3: Form Interaction", () => {
  test("valid input updates dynamic content", () => {
    const input = document.getElementById("user-input");
    const form = document.getElementById("user-form");
    const dynamicContent = document.getElementById("dynamic-content");
    const errorMessage = document.getElementById("error-message");

    input.value = "Hello Jest";
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    expect(dynamicContent.textContent).toBe("You submitted: Hello Jest");
    expect(errorMessage.classList.contains("hidden")).toBe(true);
  });

  test("empty input shows error message", () => {
    const input = document.getElementById("user-input");
    const form = document.getElementById("user-form");
    const errorMessage = document.getElementById("error-message");

    input.value = "";
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    expect(errorMessage.textContent).toBe("Input cannot be empty");
    expect(errorMessage.classList.contains("hidden")).toBe(false);
  });
});

/* ======================
   Step 4: Test DOM Manipulation Logic
   Test add/update/remove functions directly
====================== */
describe("Step 4: DOM Manipulation Functions", () => {
  test("addElement function adds or updates element", () => {
    window.addElement();
    let el = document.getElementById("added-element");
    expect(el.textContent).toBe("Button was clicked!");

    window.addElement();
    el = document.getElementById("added-element");
    expect(el.textContent).toBe("Content updated!");
  });

  test("removeElement function removes element", () => {
    window.addElement(); // add
    window.removeElement(); // remove

    const el = document.getElementById("added-element");
    expect(el).toBeNull();
  });
});

/* ======================
   Step 5: Debug DOM Interactions
   Manual step in browser; here we just confirm reset state
====================== */
describe("Step 5: Reset and Cleanup", () => {
  test("dynamic content and error message are reset before each test", () => {
    const dynamicContent = document.getElementById("dynamic-content");
    const errorMessage = document.getElementById("error-message");

    expect(dynamicContent.innerHTML).toBe("");
    expect(errorMessage.classList.contains("hidden")).toBe(true);
    expect(errorMessage.textContent).toBe("");
  });
});
