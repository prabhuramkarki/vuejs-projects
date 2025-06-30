<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
const text = ref("");
const amount = ref("");
const toast = useToast();

const emit = defineEmits(['TransactionSubmitted'])

const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error("Both field must be filled");
    return;
  }

  const transactionData ={
    text: text.value,
    amount: parseFloat(amount.value)
  }
  emit('TransactionSubmitted',transactionData)

//   console.log(amount.value, text.value);s
};
</script>
<template>
  <h3>Add New Transaction</h3>
  <form @submit.prevent="onSubmit" id="form">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" v-model="text" id="text" placeholder="Enter text..." />
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount <br /><small
          >(negative - expense, positive - income)</small
        ></label
      >
      <input
        type="text"
        v-model="amount"
        id="amount"
        placeholder="Enter amount..."
      />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>
