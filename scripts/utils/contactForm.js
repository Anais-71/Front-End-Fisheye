//DOM elements
const openButton = document.querySelector(".photograph__header--button");
const closeButton = document.querySelector(".contact__modal--close");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const modal = document.querySelector(".contact");
const form = document.querySelector(".contact__modal--form");
const firstName = form.elements["first"];
const lastName = form.elements["last"];
const email = form.elements["email"];
const message = form.elements["message"];
const submitButton = form.querySelector("[type='submit']");

// Open modal
function displayModal() {
    modal.style.display = "block";
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    form.setAttribute("aria-hidden", "false");
    firstName.focus();
}

openButton.addEventListener("click", displayModal);

// Close modal
function closeModal() {
    modal.style.display = "none";
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    form.setAttribute("aria-hidden", "true");
}

closeButton.addEventListener("click", closeModal);

// Form management
function submitForm() {
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const messageValue = message.value;
  
    console.log("Prénom:", firstNameValue);
    console.log("Nom:", lastNameValue);
    console.log("Email:", emailValue);
    console.log("Message:", messageValue);

    closeModal();
}

// Prevent default
form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitForm();
});

// Submit with enter key
openButton.addEventListener('keydown', function(e) {
    const key = e.key;

    if (key === 'Enter' || key === ' ') {
        e.preventDefault(); // Prevent default behavior (e.g., form submission)
        displayModal(); // Display the modal instead of submitting the form
    }
});

// Close modal with escape key
document.addEventListener('keydown', e => {
    const key = e.key;
    if (form.getAttribute('aria-hidden') == 'false' && key === 'Escape') {
        closeModal();
    }
});

// Keyboard navigation
form.addEventListener('keydown', e => {
    const key = e.key;
    const shiftKey = e.shiftKey;

    if (key === 'Tab') {
        if (shiftKey) { // Shift + Tab
            if (document.activeElement === firstName) {
                e.preventDefault();
                closeButton.focus();
            } else if (document.activeElement === lastName) {
                e.preventDefault();
                firstName.focus();
            } else if (document.activeElement === email) {
                e.preventDefault();
                lastName.focus();
            } else if (document.activeElement === message) {
                e.preventDefault();
                email.focus();
            } else if (document.activeElement === submitButton) {
                e.preventDefault();
                message.focus();
            }
        } else { // Tab
            if (document.activeElement === closeButton) {
                e.preventDefault();
                firstName.focus();
            } else if (document.activeElement === firstName) {
                e.preventDefault();
                lastName.focus();
            } else if (document.activeElement === lastName) {
                e.preventDefault();
                email.focus();
            } else if (document.activeElement === email) {
                e.preventDefault();
                message.focus();
            } else if (document.activeElement === message) {
                e.preventDefault();
                submitButton.focus();
            }
        }
    }
});

// Function to handle the keydown event on the contact button
function handleContactButtonKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        displayModal();
        event.preventDefault(); // Prevent the default behavior of the "Enter" key
    }
}

// Function to handle the keydown event on the contact form
function handleContactFormSubmit(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        submitForm();
        event.preventDefault(); // Prevent the default behavior of the "Enter" key
    }
}

// Adding event listeners for key presses on the contact button and the contact form
document.querySelector('.photograph__header--button').addEventListener('keydown', handleContactButtonKeyDown);
document.querySelector('.contact__button').addEventListener('keydown', handleContactFormSubmit);