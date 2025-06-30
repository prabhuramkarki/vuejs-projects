<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { ref, computed,onMounted } from "vue";

import { useToast } from "vue-toastification";
const toast = useToast();
const transactions = ref([
  // { id: 1, text: "Cash", amount: 400 },
  // { id: 2, text: "Income", amount: 300 },
  // { id: 3, text: "Book", amount: 10 },
]);

onMounted(()=>{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if(savedTransactions){
    transactions.value = savedTransactions;
  }
})
// get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// get expenses

const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});
// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });
  // console.log(transactionData);
  // console.log(generateUniqueId());
  savedTransactionstoLocal();
  toast.success("Transaction Added");
};
// generateUniqueId
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );
  savedTransactionstoLocal();
  toast.success("Transaction Deleted");
};

// save to local storage 
const savedTransactionstoLocal =()=>{
  localStorage.setItem('transactions',JSON.stringify(transactions.value))
}

</script>

<template>
  <div class="container">
    <Header />
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<style scoped></style>