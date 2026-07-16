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
});
