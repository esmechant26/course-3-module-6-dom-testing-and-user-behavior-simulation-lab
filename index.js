const dynamicContent = document.querySelector("#dynamic-content");
const errorMessage = document.querySelector("#error-message");
const input = document.querySelector("#user-input");

// Add element
window.addElement = function () {
  const p = document.createElement("p");
  p.id = "added-element";
  p.textContent = "Button was clicked!";
  dynamicContent.appendChild(p);
};

// Remove element
window.removeElement = function () {
  const el = document.querySelector("#added-element");
  if (el) el.remove();
};

// Update element
window.updateElement = function () {
  const el = document.querySelector("#added-element");
  if (el) el.textContent = "Content updated!";
};

// Form submission
window.submitForm = function () {
  const val = input.value.trim();
  if (!val) {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
  } else {
    dynamicContent.textContent = `You submitted: ${val}`;
    errorMessage.classList.add("hidden");
  }
  input.value = "";
};

// Optional: connect button to addElement (for user testing)
document
  .querySelector("#simulate-click")
  .addEventListener("click", window.addElement);
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  window.submitForm();
});
