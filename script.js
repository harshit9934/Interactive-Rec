document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------
     1. Toggle ingredients visibility
  --------------------------------------------- */
  const toggleBtn = document.getElementById("toggle-ingredients");
  const toggleLabel = document.getElementById("toggle-ingredients-label");
  const ingredientsBody = document.getElementById("ingredients-body");

  toggleBtn.addEventListener("click", () => {
    const isOpen = ingredientsBody.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleLabel.textContent = isOpen ? "Hide Ingredients" : "Show Ingredients";
  });

  /* ---------------------------------------------
     2. Start Cooking / step-by-step highlighting
  --------------------------------------------- */
  const startBtn = document.getElementById("start-cooking");
  const nextBtn = document.getElementById("next-step");
  const steps = Array.from(document.querySelectorAll(".step"));
  const gaugeFill = document.getElementById("gauge-fill");
  const gaugeRead = document.getElementById("gauge-reading");
  const totalSteps = steps.length;

  let currentStep = 0; // 0 = not started

  function renderSteps() {
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      step.classList.toggle("is-active", stepNumber === currentStep);
      step.classList.toggle("is-done", stepNumber < currentStep);
    });

    const progress = currentStep / totalSteps;
    gaugeFill.style.setProperty("--progress", progress.toFixed(3));
    gaugeRead.textContent = `Step ${currentStep} of ${totalSteps}`;

    if (currentStep >= totalSteps) {
      nextBtn.disabled = true;
      nextBtn.textContent = "All Done";
    } else if (currentStep > 0) {
      nextBtn.disabled = false;
      nextBtn.textContent = "Next Step";
    }
  }

  /* ---------------------------------------------
   Step navigation and scrolling
--------------------------------------------- */
  function scrollStepIntoView() {
    const active = document.querySelector(".step.is-active");
    if (active) active.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  startBtn.addEventListener("click", () => {
    currentStep = 1;
    startBtn.textContent = "Cooking Started";
    startBtn.disabled = true;
    nextBtn.disabled = false;
    renderSteps();
    scrollStepIntoView();
    startTimer();
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep += 1;
      renderSteps();
      scrollStepIntoView();
    }
  });
  /* ---------------------------------------------
     3. Bonus: countdown timer for prep time
  --------------------------------------------- */
  const timerDisplay = document.getElementById("timer-display");
  const timerValue = document.getElementById("timer-value");
  const PREP_SECONDS = 45 * 60; // matches the "45 min" meta pill
  let remaining = PREP_SECONDS;
  let timerInterval = null;

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  function startTimer() {
    if (timerInterval) return; // already running
    timerDisplay.hidden = false;
    timerValue.textContent = formatTime(remaining);

    timerInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = 0;
        timerValue.textContent = "Time's up!";
        clearInterval(timerInterval);
        timerInterval = null;
        return;
      }
      timerValue.textContent = formatTime(remaining);
    }, 1000);
  }
});
