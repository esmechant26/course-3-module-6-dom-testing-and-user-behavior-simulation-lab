// index.js
// Frontend JS - runs in browser

const button = document.querySelector("#simulate-click");
const form = document.querySelector("#user-form");
const input = document.querySelector("#user-input");
const dynamicContent = document.querySelector("#dynamic-content");
const errorMessage = document.querySelector("#error-message");

// Button click handler
button.addEventListener("click", () => {
  dynamicContent.textContent = "Button was clicked!";
});

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
  } else {
    dynamicContent.textContent = `You submitted: ${input.value}`;
    errorMessage.classList.add("hidden");
  }
});
