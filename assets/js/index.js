const clearButton = document.getElementById('clear-form');
const form = document.getElementById('form-content');
const mortgageAmount = document.getElementById('mortgage-amount');
const mortgageTerm = document.getElementById('mortgage-term');
const interestRate = document.getElementById('interest-rate');
const mortgageType = document.querySelectorAll('input[type="radio"][name="mortgage-type"]');
const emptyState = document.querySelector('.empty-state');
const filledState = document.querySelector('.filled-state');

function sendButton(event) {
  event.preventDefault()

  if(!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  emptyState.style.display = "none";
  filledState.style.display = "grid";
}

clearButton.addEventListener('click', () => {
  form.reset();
  emptyState.style.display = "grid";
  filledState.style.display = "none";
});