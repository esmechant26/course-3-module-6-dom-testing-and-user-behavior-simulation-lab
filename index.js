// Grab elements
const addButton = document.querySelector("#simulate-click");
const removeButton = document.querySelector("#remove-button");
const updateButton = document.querySelector("#update-button");
const dynamicContent = document.querySelector("#dynamic-content");
const form = document.querySelector("#user-form");
const input = document.querySelector("#user-input");
const errorMessage = document.querySelector("#error-message");

// --------------------
// Add element to DOM
// --------------------
addButton.addEventListener("click", () => {
  const newEl = document.createElement("p");
  newEl.textContent = "New element added!";
  newEl.id = "added-element";
  dynamicContent.appendChild(newEl);
});

// --------------------
// Remove element from DOM
// --------------------
removeButton.addEventListener("click", () => {
  const lastEl = document.querySelector("#added-element");
  if (lastEl) lastEl.remove();
});

// --------------------
// Update the DOM
// --------------------
updateButton.addEventListener("click", () => {
  const el = document.querySelector("#added-element");
  if (el) el.textContent = "Content updated!";
});

// --------------------
// Form submission and error handling
// --------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = input.value.trim();

  if (!val) {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
  } else {
    dynamicContent.textContent = `You submitted: ${val}`;
    errorMessage.classList.add("hidden");
  }

  input.value = ""; // clear input
});
