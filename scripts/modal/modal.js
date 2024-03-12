const openButton = document.querySelector(".contact__button");
const closeButton = document.querySelector(".contact__modal--close");
const header = document.querySelector(".header");
const main = document.querySelector("main"); // Assurez-vous que "main" est correctement sélectionné
const modal = document.querySelector(".contact");
const form = document.querySelector(".contact__modal--form");
const firstName = form.elements["first"];
const lastName = form.elements["last"];
const email = form.elements["email"];
const message = form.elements["message"];

// Open modal
function displayModal() {
    modal.style.display = "block";
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    form.setAttribute("aria-hidden", "false");
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

form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstNameValue = form.elements["first"].value;
    const lastNameValue = form.elements["last"].value;
    const emailValue = form.elements["email"].value;
    const messageValue = form.elements["message"].value;
  
    console.log("Prénom:", firstNameValue);
    console.log("Nom:", lastNameValue);
    console.log("Email:", emailValue);
    console.log("Message:", messageValue);
  });

// Close modal with escape key
document.addEventListener('keydown', e => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (form.getAttribute('aria-hidden') == 'false' && keyCode === 27) {
        closeModal();
    }
});
