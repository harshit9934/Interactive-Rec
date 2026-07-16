document.addEventListener('DOMContentLoaded', () => {
 
  /* ---------------------------------------------
     1. Toggle ingredients visibility
  --------------------------------------------- */
  const toggleBtn   = document.getElementById('toggle-ingredients');
  const toggleLabel = document.getElementById('toggle-ingredients-label');
  const ingredientsBody = document.getElementById('ingredients-body');
 
  toggleBtn.addEventListener('click', () => {
    const isOpen = ingredientsBody.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleLabel.textContent = isOpen ? 'Hide Ingredients' : 'Show Ingredients';
  });
});