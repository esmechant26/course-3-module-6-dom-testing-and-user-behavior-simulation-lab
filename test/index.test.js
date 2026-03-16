/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

beforeAll(() => {
  document.body.innerHTML = html;

  // Load and run the script once
  require("../index.js");

  // Fire DOMContentLoaded so listeners attach
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

beforeEach(() => {
  // Reset dynamic content and error message
  document.getElementById("dynamic-content").innerHTML = "";
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
});

describe("Simulate Click Button", () => {
  test("adds a new element when clicked", () => {
    const button = document.getElementById("simulate-click");
    const dynamicContent = document.getElementById("dynamic-content");

    expect(dynamicContent.children.length).toBe(0);

    button.click();

    const addedEl = document.getElementById("added-element");
    expect(addedEl).not.toBeNull();
    expect(addedEl.textContent).toBe("Button was clicked!");
  });

  test("updates the element correctly", () => {
    // Call functions directly via window
    window.addElement();
    window.updateElement();

    const addedEl = document.getElementById("added-element");
    expect(addedEl).not.toBeNull();
    expect(addedEl.textContent).toBe("Content updated!");
  });

  test("removes the element correctly", () => {
    window.addElement();
    window.removeElement();

    const addedEl = document.getElementById("added-element");
    expect(addedEl).toBeNull();
  });
});

describe("Form Submission", () => {
  test("updates dynamic content on valid input", () => {
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

  test("displays error message on empty input", () => {
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
