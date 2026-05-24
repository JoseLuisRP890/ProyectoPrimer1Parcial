document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const darkMode = body.classList.contains("dark");
      themeBtn.textContent = darkMode ? "☀️" : "🌙";
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    });
  }

  const slides = Array.from(document.querySelectorAll(".slideshow__img"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let current = 0;
  let intervalId = null;

  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  if (prevBtn && nextBtn && slides.length) {
    prevBtn.addEventListener("click", () => {
      showSlide(current - 1);
      restartAutoplay();
    });
    nextBtn.addEventListener("click", () => {
      showSlide(current + 1);
      restartAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.slide);
        showSlide(idx);
        restartAutoplay();
      });
    });

    function startAutoplay() {
      intervalId = setInterval(nextSlide, 5000);
    }

    function restartAutoplay() {
      clearInterval(intervalId);
      startAutoplay();
    }

    showSlide(0);
    startAutoplay();
  }

  document.querySelectorAll(".accordion__trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion__item").forEach(el => el.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const courseInput = document.getElementById("course");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const courseError = document.getElementById("courseError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let valid = true;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const course = courseInput.value.trim();
      const message = messageInput.value.trim();

      nameError.textContent = "";
      emailError.textContent = "";
      courseError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";

      if (name.length < 3) {
        nameError.textContent = "Ingresa un nombre válido de al menos 3 caracteres.";
        valid = false;
      }

      if (!emailRegex.test(email)) {
        emailError.textContent = "Ingresa un correo electrónico válido.";
        valid = false;
      }

      if (!course) {
        courseError.textContent = "Selecciona un curso de interés.";
        valid = false;
      }

      if (message.length < 10) {
        messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
        valid = false;
      }

      if (valid) {
        formSuccess.textContent = "¡Mensaje enviado correctamente! Pronto nos pondremos en contacto.";
        form.reset();
      }
    });
  }
});
