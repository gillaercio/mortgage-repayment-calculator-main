const clearButton = document.getElementById('clear-form');
const form = document.getElementById('form-content');
const emptyState = document.querySelector('.empty-state');
const filledState = document.querySelector('.filled-state');
const resultMonthly = document.getElementById('result-monthly');
const resultTotal = document.getElementById('result-total');

const typeErrorMsg = document.querySelector('fieldset.form__type + .error-message');

function sendButton(event) {
  event.preventDefault()

  const mortgageAmountEl = document.getElementById("mortgage-amount");
  const mortgageTermEl = document.getElementById("mortgage-term");
  const interestRateEl = document.getElementById("interest-rate");
  const repaymentEl = document.getElementById("repayment");
  const interestOnlyEl = document.getElementById("interest-only");

  document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
  document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

  const required = 'This field is required';
  let hasError = false;

  if (!mortgageAmountEl.value.trim()) {
    showFieldError(mortgageAmountEl, required);
    hasError = true;
  }

  if (!mortgageTermEl.value.trim()) {
    showFieldError(mortgageTermEl, required);
    hasError = true;
  }

  if (!interestRateEl.value.trim()) {
    showFieldError(interestRateEl, required);
    hasError = true;
  }

  if (!repaymentEl.checked && !interestOnlyEl.checked) {
    if (typeErrorMsg) {
      typeErrorMsg.textContent = required;
      typeErrorMsg.style.visibility = 'visible';
    }
    hasError = true;
  }

  if (hasError) return;

  const mortgageAmount = parseFloat(mortgageAmountEl.value);
  const mortgageTerm = parseInt(mortgageTermEl.value);
  const interestRate = parseFloat(interestRateEl.value) / 100;

  let monthlyPayment = 0;
  let totalPayment = 0;

  if (repaymentEl.checked) {
    const monthlyRate = interestRate / 12;
    const numberOfPayments = mortgageTerm * 12;

    monthlyPayment = (mortgageAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    totalPayment = monthlyPayment * numberOfPayments;
  } else if (interestOnlyEl.checked) {
    monthlyPayment = (mortgageAmount * interestRate) / 12;
    totalPayment = monthlyPayment * mortgageTerm * 12;
  }

  resultMonthly.textContent = `£${monthlyPayment.toFixed(2)}`;
  resultTotal.textContent = `£${totalPayment.toFixed(2)}`;

  emptyState.style.display = "none";
  filledState.style.display = "grid";
}

clearButton.addEventListener('click', () => {
  form.reset();

  emptyState.style.display = "grid";
  filledState.style.display = "none";

  document.querySelectorAll(".error-message").forEach(msg => {
    msg.textContent = "";
    msg.style.visibility = "hidden";
  });

  document.querySelectorAll(".input-with-unit.input-error").forEach(el => {
    el.classList.remove("input-error");
  });
});

function showFieldError(inputEl, message) {
  const wrapper = inputEl.closest('.input-with-unit') || inputEl;
  wrapper.classList.add('input-error');

  const container = wrapper.parentElement;
  // const errorMsg = container?.querySelector('.error-message');
  
  let errorMsg;
    if (container !== null && container !== undefined) {
      errorMsg = container.querySelector('.error-message');
    } else {
      errorMsg = undefined;
    }

  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.style.visibility = "visible";
  };
}

[mortgageAmountEl, mortgageTermEl, interestRateEl].forEach(input => {
  input.addEventListener("input", () => {
    clearFieldError(input);
  });
});

[repaymentEl, interestOnlyEl].forEach(radio => {
  radio.addEventListener("change", () => {
    typeErrorMsg.textContent = "";
    typeErrorMsg.style.visibility = "hidden";
  });
});

function clearFieldError(inputEl) {
  const wrapper = inputEl.closest('.input-with-unit') || inputEl;
  wrapper.classList.remove("input-error");

  const container = wrapper.parentElement;

  let errorMsg;
    if (container !== null && container !== undefined) {
      errorMsg = container.querySelector('.error-message');
    } else {
      errorMsg = undefined;
    }

  if (errorMsg) {
    errorMsg.textContent = "";
    errorMsg.style.visibility = "hidden";
  };
}