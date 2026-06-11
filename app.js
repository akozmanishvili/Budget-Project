//to store transaction objects
let transactions = [];

//get html elements
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const transactionList = document.getElementById(`transaction-list`);
const balance = document.getElementById(`balance`);

const addBlance = function (transactions) {
  let sum = 0;
  for (const amounts of transactions) {
    sum += amounts.amountInput;
  }
  balance.textContent = String(sum);
};
//function to add transaction in transaction list
const addTransactionDOM = function (transaction) {
  const list = document.createElement("li");
  list.innerHTML = `${transaction.textInput}: <span>${transaction.amountInput > 0 ? "+$" + transaction.amountInput : "-$" + String(transaction.amountInput).slice(1)} </span>`;
  transaction.amountInput > 0
    ? list.classList.add("plus")
    : list.classList.add("minus");
  transactionList.appendChild(list);
};

form.addEventListener("submit", function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Enter the transaction");
    return;
  }

  const transaction = {
    id: Date.now(),
    textInput: text.value,
    amountInput: Number(amount.value),
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  addBlance(transactions);
  amount.value = "";
  text.value = "";
});
