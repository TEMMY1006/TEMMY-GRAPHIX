
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close the mobile menu when a navigation link is selected
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Automatically update the copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Reveal sections as they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Preselect a service when the visitor clicks "Discuss project"
const projectType = document.getElementById("projectType");

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    projectType.value = link.dataset.service;
  });
});

// Contact form: create a WhatsApp message
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = document.getElementById("clientName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const service = projectType.value;
  const details = document.getElementById("projectDetails").value.trim();

  if (!name || !email || !service || !details) {
    alert("Please complete all fields before continuing.");
    return;
  }

  const message = [
    "Hello Temmy Graphics!",
    "",
    "I would like to discuss a design project.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    "Project details:",
    details
  ].join("\n");

  const whatsappURL =
    "https://wa.me/2349116221696?text=" +
    encodeURIComponent(message);

  // Open WhatsApp in a new tab so the form page stays available
  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  // Fallback if the browser blocks the new tab
  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
});
