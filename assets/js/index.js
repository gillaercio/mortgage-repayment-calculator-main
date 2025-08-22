const clearButton = document.getElementById('clear-form');
const form = document.getElementById('form-content');
const emptyState = document.querySelector('.empty-state');
const filledState = document.querySelector('.filled-state');
const resultMonthly = document.getElementById('result-monthly');
const resultTotal = document.getElementById('result-total');

function sendButton(event) {
  event.preventDefault()

  if(!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
  const mortgageTerm = parseInt(document.getElementById('mortgage-term').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value);
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value;

  const months = mortgageTerm * 12;
  const monthlyRate = interestRate / 100 / 12;

  let monthlyRepayment = 0;
  let totalRepayment = 0;

  if (mortgageType === 'repayment') {
    const factor = (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    monthlyRepayment = mortgageAmount * factor;
    totalRepayment = monthlyRepayment * months;
  } else if (mortgageType === 'interest-only') {
    monthlyRepayment = mortgageAmount * monthlyRate;
    totalRepayment = monthlyRepayment * months + mortgageAmount;
  }

  resultMonthly.textContent = `£${monthlyRepayment.toFixed(2)}`;
  resultTotal.textContent = `£${totalRepayment.toFixed(2)}`;

  emptyState.style.display = "none";
  filledState.style.display = "grid";
}

clearButton.addEventListener('click', () => {
  form.reset();
  emptyState.style.display = "grid";
  filledState.style.display = "none";
});