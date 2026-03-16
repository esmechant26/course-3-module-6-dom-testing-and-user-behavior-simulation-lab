// Grab DOM elements
const dynamicContent = document.querySelector("#dynamic-content");
const errorMessage = document.querySelector("#error-message");
const input = document.querySelector("#user-input");
const simulateButton = document.querySelector("#simulate-click");

// Track if element has been added
let added = false;

// --------------------
// 1️⃣ Add element
window.addElement = function () {
  if (!added) {
    const p = document.createElement("p");
    p.id = "added-element";
    p.textContent = "Button was clicked!"; // exact auto-test text
    dynamicContent.appendChild(p);
    added = true;
  }
};

// --------------------
// 2️⃣ Remove element
window.removeElement = function () {
  const el = document.querySelector("#added-element");
  if (el) {
    el.remove();
    added = false;
  }
};

// --------------------
// 3️⃣ Update element
window.updateElement = function () {
  const el = document.querySelector("#added-element");
  if (el) {
    el.textContent = "Content updated!"; // exact auto-test text
  }
};

// --------------------
// 4️⃣ Form submission
window.submitForm = function () {
  const val = input.value.trim();

  if (!val) {
    // 5️⃣ Display error message
    errorMessage.textContent = "Input cannot be empty"; // exact text
    errorMessage.classList.remove("hidden");
  } else {
    dynamicContent.textContent = `You submitted: ${val}`;
    errorMessage.classList.add("hidden");
  }

  input.value = ""; // clear input
};
