// Add or update element
function addOrUpdateElement() {
  const container = document.getElementById("dynamic-content");
  let el = document.getElementById("added-element");

  if (!el) {
    el = document.createElement("p");
    el.id = "added-element";
    el.textContent = "Button was clicked!";
    container.appendChild(el);
  } else {
    el.textContent = "Content updated!";
  }
}

// Remove element
function removeElement() {
  const el = document.getElementById("added-element");
  if (el) el.remove();
}

// Form submission
function submitForm() {
  const input = document.getElementById("user-input");
  const container = document.getElementById("dynamic-content");
  const errorMessage = document.getElementById("error-message");
  const value = input.value.trim();

  if (!value) {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
  } else {
    container.textContent = `You submitted: ${value}`;
    errorMessage.classList.add("hidden");
  }

  input.value = "";
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("simulate-click")
    .addEventListener("click", addOrUpdateElement);

  document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });

  // Expose functions for auto-grader
  window.addElement = addOrUpdateElement;
  window.removeElement = removeElement;
  window.submitForm = submitForm;
});
