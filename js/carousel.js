document.addEventListener("DOMContentLoaded", function () {
  // Testimonial Carousel Functionality
  const testimonialContainer = document.getElementById("testimonialContainer");

  if (testimonialContainer) {
    const testimonials =
      testimonialContainer.querySelectorAll(".testimonial-item");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    const dots = document.querySelectorAll("#testimonialDots .dot");
    const progressBar = document.getElementById("testimonialProgress");
    const playPauseBtn = document.getElementById("autoplayToggle");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const playPauseText = document.getElementById("playPauseText");

    let currentIndex = 0;
    let autoplayInterval;
    let progressInterval;
    let isPlaying = true;
    let slideWidth;

    // Calculate slide width based on viewport
    function calculateSlideWidth() {
      return window.innerWidth < 768 ? 100 : 33.333; // Mobile: 100%, Desktop: 33.333%
    }

    // Update slide positions
    function updateSlidePosition() {
      slideWidth = calculateSlideWidth();
      testimonialContainer.style.transform = `translateX(-${
        currentIndex * slideWidth
      }%)`;

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("bg-brand-orange");
          dot.classList.remove("bg-gray-300");
          dot.setAttribute("aria-selected", "true");
        } else {
          dot.classList.remove("bg-brand-orange");
          dot.classList.add("bg-gray-300");
          dot.setAttribute("aria-selected", "false");
        }
      });
    }

    // Go to specific slide
    function goToSlide(index) {
      const maxIndex =
        window.innerWidth < 768
          ? testimonials.length - 1
          : Math.floor(testimonials.length / 3) - 1;
      currentIndex = (index + maxIndex + 1) % (maxIndex + 1);
      updateSlidePosition();
      resetAutoplay();
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Start autoplay
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      if (progressInterval) clearInterval(progressInterval);

      isPlaying = true;
      playPauseIcon.className = "fas fa-pause mr-2";
      playPauseText.textContent = "Pause";

      // Reset progress bar
      progressBar.style.width = "0%";

      // Progress bar animation
      let progress = 0;
      progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 100);

      // Autoplay slides
      autoplayInterval = setInterval(() => {
        nextSlide();

        // Reset progress bar
        progress = 0;
        progressBar.style.width = "0%";
        progressInterval = setInterval(() => {
          progress += 2;
          progressBar.style.width = `${progress}%`;
          if (progress >= 100) {
            clearInterval(progressInterval);
          }
        }, 100);
      }, 5000);
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
      isPlaying = false;
      playPauseIcon.className = "fas fa-play mr-2";
      playPauseText.textContent = "Play";
      progressBar.style.width = "0%";
    }

    // Reset autoplay
    function resetAutoplay() {
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    }

    // Event listeners
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
      });

    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
      });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoplay();
      });
    });

    if (playPauseBtn)
      playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });

    // Pause on hover
    testimonialContainer.addEventListener("mouseenter", () => {
      if (isPlaying) stopAutoplay();
    });

    testimonialContainer.addEventListener("mouseleave", () => {
      if (isPlaying) startAutoplay();
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      updateSlidePosition();
      resetAutoplay();
    });

    // Initialize
    updateSlidePosition();
    startAutoplay();
  }

  // Service Tabs
  const serviceTabs = document.querySelectorAll(".service-tab");
  const serviceCardItems = document.querySelectorAll(".service-card-item");

  if (serviceTabs.length > 0 && serviceCardItems.length > 0) {
    serviceTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        serviceTabs.forEach((t) => {
          t.classList.remove("active", "bg-brand-orange", "text-white");
          t.classList.add("hover:bg-brand-orange", "hover:text-white");
        });

        // Add active class to clicked tab
        tab.classList.add("active", "bg-brand-orange", "text-white");
        tab.classList.remove("hover:bg-brand-orange", "hover:text-white");

        // Filter service cards
        const service = tab.getAttribute("data-service");
        serviceCardItems.forEach((card) => {
          if (
            service === "all" ||
            card.getAttribute("data-category") === service
          ) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }
});
