const clearClass = document.getElementById('clear-class');
const mortgageAmount = document.getElementById('mortgage-amount');
const mortgageTerm = document.getElementById('mortgage-term');
const interestRate = document.getElementById('interest-rate');
const emptyState = document.querySelector('.empty-state');
const filledState = document.querySelector('.filled-state');

function sendButton(event) {
  event.preventDefault()

  if (mortgageAmount || mortgageTerm || interestRate === "") {
    alert('Por favor preencha os campos solicitados');
  } else {
    emptyState.style.display = "none";
    filledState.style.display = "flex";
  }
}

function clearForm() {


  if(clearForm) {
    mortgageAmount.value = "";
    mortgageTerm.value = "";
    interestRate.value = "";

    emptyState.style.display = "grid";
    filledState.style.display = "none";
  }
}