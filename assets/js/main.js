// === Cedaro Mobile Hamburger Menu ===
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  const body = document.body;

  if (hamburgerBtn && mobileDrawer && backdrop) {
    function toggleMenu() {
      hamburgerBtn.classList.toggle("active");
      mobileDrawer.classList.toggle("active");
      backdrop.classList.toggle("active");
      body.classList.toggle("no-scroll"); // Prevents scrolling when drawer is open
    }

    hamburgerBtn.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", toggleMenu);
  } else {
    console.error("One or more hamburger menu elements not found");
  }
});

// === Cedaro Custom Slider ===
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  let currentIndex = 0;
  let interval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("span");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function goToSlide(index) {
    showSlide(index);
    resetInterval();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  // Init
  showSlide(0);
  interval = setInterval(nextSlide, 3000);
});