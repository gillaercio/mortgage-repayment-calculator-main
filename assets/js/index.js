const mortgageAmount = document.getElementById('mortgage-amount');
const mortgageTerm = document.getElementById('mortgage-term');
const interestRate = document.getElementById('interest-rate');
const mortgageType = document.querySelector('input[type="radio"][name="mortgage-type"]');
const emptyState = document.querySelector('.empty-state');
const filledState = document.querySelector('.filled-state');

function sendButton(event) {
  event.preventDefault()

  if (mortgageAmount === "" || mortgageTerm === "" || interestRate === "" || mortgageType.checked === false) {
    alert('Por favor preencha os campos solicitados');
    return;
  } else {
    emptyState.style.display = "none";
    filledState.style.display = "grid";
    return;
  }
}

// const clearForm = document.getElementById('clear-form');

function clearForm(event) {
  event.preventDefault()
  
  if(clearForm) {
    mortgageAmount.value = "";
    mortgageTerm.value = "";
    interestRate.value = "";
    mortgageType.checked = false;
    
    emptyState.style.display = "grid";
    filledState.style.display = "none";
    return;
  }
}