/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

// Load HTML into jsdom
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

beforeAll(() => {
  document.body.innerHTML = html;

  // Load the main script
  require("../index.js");

  // Fire DOMContentLoaded so event listeners attach
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

    button.click(); // first click adds element

    const addedEl = document.getElementById("added-element");
    expect(addedEl).not.toBeNull();
    expect(addedEl.textContent).toBe("Button was clicked!");
  });

  test("updates the element text when clicked a second time", () => {
    const button = document.getElementById("simulate-click");

    button.click(); // first click adds element
    button.click(); // second click updates element

    const addedEl = document.getElementById("added-element");
    expect(addedEl).not.toBeNull();
    expect(addedEl.textContent).toBe("Content updated!");
  });

  test("removes the element correctly", () => {
    window.addElement(); // add element first
    window.removeElement(); // remove

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
