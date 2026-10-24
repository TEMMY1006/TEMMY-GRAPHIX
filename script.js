
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // Update copyright year automatically
  $("year").textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = $("menuToggle");
  const navLinks = $("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Portfolio category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.category === filter;

        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  // Service buttons preselect the relevant contact option
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const serviceSelect = $("serviceSelect");
      const service = link.dataset.service;

      if (serviceSelect) {
        serviceSelect.value = service;
      }
    });
  });

  // Contact form: prepare a WhatsApp message
  const contactForm = $("contactForm");
  const formMessage = $("formMessage");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = $("clientName").value.trim();
    const email = $("clientEmail").value.trim();
    const service = $("serviceSelect").value;
    const budget = $("budgetSelect").value || "Prefer to discuss";
    const details = $("projectDetails").value.trim();

    if (!name || !email || !service || !details) {
      formMessage.textContent =
        "Please complete all required fields.";
      return;
    }

    // Replace this number if your WhatsApp contact changes.
    const whatsappNumber = "2349116221696";

    const message = [
      "Hello Temmy Graphics!",
      "",
      "I would like to discuss a project.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Service: " + service,
      "Estimated budget: " + budget,
      "",
      "Project details:",
      details,
      "",
      "Sent from the Temmy Graphics website."
    ].join("\n");

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    formMessage.textContent =
      "Opening WhatsApp. Please review your message and press Send there.";

    const newWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // Fallback for browsers that block new windows
    if (!newWindow) {
      window.location.href = whatsappURL;
    }
  });

  // Scroll progress indicator and back-to-top button
  const progressBar = $("scrollProgress");
  const backToTop = $("backToTop");

  function updateScrollUI() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

    progressBar.style.width = Math.min(progress, 100) + "%";

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 450
    );
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateScrollUI();

  // Highlight the navigation link for the current section
  const sections = document.querySelectorAll("main section[id]");
  let scrollObserver = null;

  if ("IntersectionObserver" in window) {
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === "#" + currentId;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      scrollObserver.observe(section);
    });
  }

  // Gentle reveal animations
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealElements = document.querySelectorAll(
      ".service-card, .project-card, .process-step, .about-copy, .contact-form"
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
    });

    document.body.classList.add("js-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
});
