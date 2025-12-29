/* =====================================
   Cedaro Mobile Hamburger Menu
===================================== */
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
      body.classList.toggle("no-scroll");
    }

    hamburgerBtn.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", toggleMenu);
  }
});


/* =====================================
   Cedaro Hero / Custom Slider
===================================== */
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;
  let interval;

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
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function goToSlide(index) {
    showSlide(index);
    resetInterval();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  showSlide(0);
  interval = setInterval(nextSlide, 3000);
});


/* =====================================
   Meet The Lineup – Infinite Carousel
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".lineup-track");
  const items = Array.from(track.children);
  const prevBtn = document.querySelector(".lineup-arrow.left");
  const nextBtn = document.querySelector(".lineup-arrow.right");

  const visibleCount = 3;
  const totalItems = items.length;
  let index = visibleCount;
  let isAnimating = false;

  /* ---- CLONE ITEMS ---- */
  const startClones = items.slice(0, visibleCount).map(i => i.cloneNode(true));
  const endClones = items.slice(-visibleCount).map(i => i.cloneNode(true));

  endClones.forEach(c => track.prepend(c));
  startClones.forEach(c => track.append(c));

  const allItems = track.children;
  const movePercent = 100 / visibleCount;

  /* ---- INITIAL POSITION ---- */
  track.style.transform = `translateX(-${index * movePercent}%)`;

  function moveTo(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${newIndex * movePercent}%)`;
    index = newIndex;
  }

  function moveLeft() {
    if (isAnimating) return;

    if (index === visibleCount) {
      track.style.transition = "none";
      index = totalItems + visibleCount;
      track.style.transform = `translateX(-${index * movePercent}%)`;
      track.offsetHeight;
    }

    moveTo(index - 1);
  }

  nextBtn.addEventListener("click", () => moveTo(index + 1));
  prevBtn.addEventListener("click", moveLeft);

  track.addEventListener("transitionend", () => {
    track.style.transition = "none";

    if (index >= totalItems + visibleCount) {
      index = visibleCount;
      track.style.transform = `translateX(-${index * movePercent}%)`;
    }

    if (index <= 0) {
      index = totalItems;
      track.style.transform = `translateX(-${index * movePercent}%)`;
    }

    isAnimating = false;
  });
});


