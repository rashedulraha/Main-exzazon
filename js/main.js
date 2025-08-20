// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const menuIcon = document.getElementById("menuIcon");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openMobileMenu() {
  if (mobileMenu && mobileMenuOverlay && menuIcon) {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenuOverlay.classList.add("active");
    menuIcon.classList.replace("fa-bars", "fa-times");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
  }
}

function closeMobileMenu() {
  if (mobileMenu && mobileMenuOverlay && menuIcon) {
    mobileMenu.classList.add("translate-x-full");
    mobileMenuOverlay.classList.remove("active");
    menuIcon.classList.replace("fa-times", "fa-bars");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
if (mobileMenuOverlay)
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove("opacity-0", "invisible");
      backToTopBtn.classList.add("opacity-100", "visible");
    } else {
      backToTopBtn.classList.add("opacity-0", "invisible");
      backToTopBtn.classList.remove("opacity-100", "visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Process Progress Bar Animation
const processSteps = document.querySelectorAll(".process-step");
const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
  const scrollPosition = window.scrollY;
  const processSection = document.getElementById("process");

  if (processSection && progressBar) {
    const sectionTop = processSection.offsetTop;
    const sectionHeight = processSection.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop - 200 && scrollPosition <= sectionBottom) {
      const progress =
        ((scrollPosition - sectionTop + 200) / sectionHeight) * 100;
      progressBar.style.height = `${Math.min(progress, 100)}%`;
    }
  }
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("text-brand-cyberTeal");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("text-brand-cyberTeal");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

// Add animation to service cards when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all service cards
document.querySelectorAll(".service-card-item").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.getElementById("home");

  if (heroSection) {
    const heroShapes = heroSection.querySelectorAll(".absolute > div");
    heroShapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Add hover effect to CTA button
const ctaButton = document.getElementById("ctaButton");
if (ctaButton) {
  ctaButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
  });

  ctaButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
}

// Initialize tooltips if needed (using a simple custom implementation)
document.querySelectorAll("[title]").forEach((element) => {
  element.addEventListener("mouseenter", function () {
    const title = this.getAttribute("title");
    const tooltip = document.createElement("div");
    tooltip.className =
      "absolute bg-gray-800 text-white text-xs rounded py-1 px-2 z-50";
    tooltip.textContent = title;
    tooltip.style.bottom = "100%";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.marginBottom = "5px";
    this.style.position = "relative";
    this.appendChild(tooltip);
    this.removeAttribute("title");
    this.setAttribute("data-title", title);
  });

  element.addEventListener("mouseleave", function () {
    const tooltip = this.querySelector("div");
    if (tooltip) {
      this.setAttribute("title", this.getAttribute("data-title"));
      this.removeChild(tooltip);
    }
  });
});
