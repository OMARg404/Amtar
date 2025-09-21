// script.js (updated)

// ------------------ Slider functionality ------------------
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".nav-btn.left");
const nextBtn = document.querySelector(".nav-btn.right");
let currentIndex = 0;
let autoSlide;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000); // 5s
}

const sliderEl = document.querySelector(".slider");
if (sliderEl) {
  sliderEl.addEventListener("mouseenter", () => clearInterval(autoSlide));
  sliderEl.addEventListener("mouseleave", startAutoSlide);
}

if (prevBtn) prevBtn.addEventListener("click", prevSlide);
if (nextBtn) nextBtn.addEventListener("click", nextSlide);

showSlide(currentIndex);
startAutoSlide();


// ------------------ Projects carousel navigation (RTL-safe) ------------------
(function() {
  const carousel = document.querySelector(".projects-carousel");
  const prev = document.querySelector(".proj-nav-btn.left");
  const next = document.querySelector(".proj-nav-btn.right");
  if (!carousel || !prev || !next) return;

  // Determine logical direction multiplier.
  // In LTR: multiplier = 1  -> next => +amount, prev => -amount
  // In RTL: multiplier = -1 -> signs flip so visual direction matches button labels
  const dir = getComputedStyle(carousel).direction || document.documentElement.dir || 'ltr';
  const directionMultiplier = (dir === 'rtl') ? -1 : 1;

  const getAmount = () => Math.floor(carousel.clientWidth * 0.9);

  prev.addEventListener("click", () => {
    // "Prev" should move to previous items (visual left or right depending on RTL)
    carousel.scrollBy({ left: -directionMultiplier * getAmount(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    // "Next" should move to next items
    carousel.scrollBy({ left: directionMultiplier * getAmount(), behavior: "smooth" });
  });

  // Optional: keyboard support (← / →)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      // ArrowLeft moves to previous visually
      carousel.scrollBy({ left: -directionMultiplier * getAmount(), behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      carousel.scrollBy({ left: directionMultiplier * getAmount(), behavior: "smooth" });
    }
  });
})();


// ------------------ Drag/Swipe for projects carousel ------------------
(function() {
  const carousel = document.querySelector(".projects-carousel");
  if (!carousel) return;

  let isDown = false;
  let lastX = 0;
  const getX = (e) => (e.touches ? e.touches[0].pageX : e.pageX);

  const start = (e) => {
    isDown = true;
    lastX = getX(e);
    carousel.classList.add("dragging");
  };

  const move = (e) => {
    if (!isDown) return;
    const x = getX(e);
    const delta = x - lastX;
    // drag direction should remain consistent regardless of RTL — using delta to scroll
    carousel.scrollBy({ left: -delta, behavior: "auto" });
    lastX = x;
    if (e.cancelable) e.preventDefault();
  };

  const end = () => {
    isDown = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", start);
  carousel.addEventListener("mousemove", move);
  document.addEventListener("mouseup", end);

  carousel.addEventListener("touchstart", start, { passive: true });
  carousel.addEventListener("touchmove", move, { passive: false });
  document.addEventListener("touchend", end);
})();


document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      console.log('Search clicked');
    });
  }

  // ------------------ Requests carousel navigation ------------------
  (function() {
    const carousel = document.querySelector('.requests-carousel');
    const prev = document.querySelector('.requests-nav-btn.left');
    const next = document.querySelector('.requests-nav-btn.right');
    if (!carousel || !prev || !next) return;

    const dir = getComputedStyle(carousel).direction || document.documentElement.dir || 'ltr';
    const directionMultiplier = (dir === 'rtl') ? -1 : 1;
    const getAmount = () => Math.floor(carousel.clientWidth * 0.9);

    prev.addEventListener('click', () => {
      carousel.scrollBy({ left: -directionMultiplier * getAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      carousel.scrollBy({ left: directionMultiplier * getAmount(), behavior: 'smooth' });
    });

    // Drag/Swipe
    let isDown = false;
    let lastX = 0;
    const getX = (e) => (e.touches ? e.touches[0].pageX : e.pageX);
    const start = (e) => { isDown = true; lastX = getX(e); };
    const move = (e) => {
      if (!isDown) return;
      const x = getX(e);
      const delta = x - lastX;
      carousel.scrollBy({ left: -delta, behavior: 'auto' });
      lastX = x;
      if (e.cancelable) e.preventDefault();
    };
    const end = () => { isDown = false; };

    carousel.addEventListener('mousedown', start);
    carousel.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    carousel.addEventListener('touchstart', start, { passive: true });
    carousel.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', end);
  })();
});
