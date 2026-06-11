//to store transaction objects
let transactions =
  localStorage.getItem(`transactions`) !== null
    ? JSON.parse(localStorage.getItem(`transactions`))
    : [];

//get html elements
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const transactionList = document.getElementById(`transaction-list`);
const balance = document.getElementById(`balance`);

//to update total balance
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

  list.innerHTML = `${transaction.textInput}: <span>${transaction.amountInput > 0 ? "+$" + transaction.amountInput : "-$" + String(transaction.amountInput).slice(1)} </span> <button class = 'delete-btn' onclick = 'removeTransaction(${transaction.id})  '>x</button>`;
  transaction.amountInput > 0
    ? list.classList.add("plus")
    : list.classList.add("minus");
  transactionList.appendChild(list);
};

const init = function () {
  transactionList.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  addBlance(transactions);
};

init();
//to remain data in local storage
const updateLocalStorage = function () {
  localStorage.setItem(`transactions`, JSON.stringify(transactions));
};

//listener when submitted new transaction
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
  updateLocalStorage(transactions);

  amount.value = "";
  text.value = "";
});

//removing transaction function
const removeTransaction = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
};
