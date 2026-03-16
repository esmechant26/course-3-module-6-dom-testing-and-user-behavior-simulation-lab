// Function to add or update the element
function addOrUpdateElement() {
  const dynamicContent = document.getElementById("dynamic-content");
  let el = document.getElementById("added-element");

  if (!el) {
    // If element doesn't exist, create it
    el = document.createElement("p");
    el.id = "added-element";
    el.textContent = "Button was clicked!";
    dynamicContent.appendChild(el);
  } else {
    // If element exists, update text
    el.textContent = "Content updated!";
  }
}

// Function to remove the element
function removeElement() {
  const el = document.getElementById("added-element");
  if (el) {
    el.remove();
  }
}

// Function to handle form submission
function submitForm() {
  const input = document.getElementById("user-input");
  const dynamicContent = document.getElementById("dynamic-content");
  const errorMessage = document.getElementById("error-message");

  const value = input.value.trim();

  if (!value) {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
  } else {
    dynamicContent.textContent = `You submitted: ${value}`;
    errorMessage.classList.add("hidden");
  }

  input.value = "";
}

// Attach event listeners after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("simulate-click")
    .addEventListener("click", addOrUpdateElement);
  document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });

  // Attach functions globally for Jest / auto-grader
  window.addElement = addOrUpdateElement; // same function
  window.removeElement = removeElement;
  window.submitForm = submitForm;
});
