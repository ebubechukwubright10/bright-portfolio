console.log("script.js is running!");
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
const contactForm = document.querySelector(".contact-container form");
const formPopup = document.getElementById("form-popup");
const closePopup = document.getElementById("popup-close");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  let errorMessage = document.getElementById("form-error");

  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.id = "form-error";
    errorMessage.setAttribute("role", "alert");
    errorMessage.style.color = "#ff5555";
    contactForm.appendChild(errorMessage);
  }

  errorMessage.textContent = "";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Message submission failed.");
    }

    contactForm.reset();
    formPopup.hidden = false;
    formPopup.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } catch (error) {
    errorMessage.textContent =
      "Sorry, your message couldn't be sent. Please try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

closePopup.addEventListener("click", function () {
  formPopup.hidden = true;
});
