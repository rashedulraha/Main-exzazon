// FAQ Accordion
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const faqAnswer = faqItem.querySelector(".faq-answer");
  const faqIcon = element.querySelector(".faq-icon");

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.querySelector(".faq-answer").classList.add("hidden");
      item.querySelector(".faq-icon").classList.remove("active");
    }
  });

  // Toggle current FAQ item
  faqAnswer.classList.toggle("hidden");
  faqIcon.classList.toggle("active");
}

// Theme Selector for FAQ
const themeButtons = document.querySelectorAll(".theme-btn");
const root = document.documentElement;

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    themeButtons.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Apply theme
    if (btn.classList.contains("theme-orange")) {
      root.style.setProperty("--theme-accent", "#f97316");
      root.style.setProperty("--theme-secondary", "#3b82f6");
    } else if (btn.classList.contains("theme-green")) {
      root.style.setProperty("--theme-accent", "#10b981");
      root.style.setProperty("--theme-secondary", "#14b8a6");
    } else if (btn.classList.contains("theme-purple")) {
      root.style.setProperty("--theme-accent", "#8b5cf6");
      root.style.setProperty("--theme-secondary", "#ec4899");
    }
  });
});

// Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnIcon = document.getElementById("btnIcon");
  const successMessage = document.getElementById("successMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.className = "fas fa-spinner fa-spin ml-2";

    // Simulate form submission
    setTimeout(() => {
      // Reset form
      contactForm.reset();

      // Show success message
      successMessage.classList.remove("hidden");

      // Reset button
      submitBtn.disabled = false;
      btnText.textContent = "Send";
      btnIcon.className = "fas fa-paper-plane ml-2";

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    }, 2000);
  });
}

// Signup Modal
const signupModal = document.getElementById("signupModal");
const signupForm = document.getElementById("signupForm");

function showSignupModal() {
  if (signupModal) {
    signupModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeSignupModal() {
  if (signupModal) {
    signupModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    if (signupForm) signupForm.reset();
  }
}

// Close modal when clicking outside
if (signupModal) {
  signupModal.addEventListener("click", function (e) {
    if (e.target === signupModal) {
      closeSignupModal();
    }
  });
}

// Handle signup form submission
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Creating Account...";
    submitBtn.disabled = true;

    // Simulate account creation
    setTimeout(() => {
      // Reset form
      signupForm.reset();

      // Show success message (you can customize this)
      alert(
        "Account created successfully! Please check your email for verification."
      );

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Close modal
      closeSignupModal();
    }, 2000);
  });
}

// Newsletter Subscription
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletterEmail");
  if (!emailInput) return;

  const email = emailInput.value.trim();

  if (email && isValidEmail(email)) {
    // Show loading state
    const originalPlaceholder = emailInput.placeholder;
    emailInput.placeholder = "Subscribing...";
    emailInput.disabled = true;

    // Simulate subscription
    setTimeout(() => {
      // Reset input
      emailInput.value = "";
      emailInput.placeholder = originalPlaceholder;
      emailInput.disabled = false;

      // Show success message
      alert("Thank you for subscribing! You will receive our latest updates.");
    }, 1500);
  } else {
    alert("Please enter a valid email address.");
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
