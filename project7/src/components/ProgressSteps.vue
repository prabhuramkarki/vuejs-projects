<script setup>
import { ref } from "vue";

const steps = ref(["Step 1", "Step 2", "Step 3"]);
const currentStep = ref(0);

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['step', { 'step-active': index === currentStep }]"
      >
        {{ step }}
      </div>
    </div>
    <div class="controls">
      <button @click="prevStep" :disabled="currentStep === 0" class="btn">
        Previous
      </button>
      <button
        @click="nextStep"
        :disabled="currentStep === steps.length - 1"
        class="btn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  max-width: 380px;
  margin: 50px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.progress-bar {
  display: flex;
  background-color: #f0f0f3;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: inset 0 0 8px #d1d5db;
}

.step {
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-weight: 600;
  font-size: 1rem;
  color: #6b7280; /* cool gray */
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: default;
  user-select: none;
  border-right: 1px solid #e5e7eb;
}

.step:last-child {
  border-right: none;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.step:first-child {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.step-active {
  background-color: #7c3aed; /* vibrant purple */
  color: white;
  box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);
}

.controls {
  margin-top: 24px;
  text-align: center;
}

.btn {
  padding: 10px 22px;
  margin: 0 8px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  background-color: #7c3aed;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
}

.btn:hover:not(:disabled) {
  background-color: #5b21b6;
  box-shadow: 0 6px 16px rgba(91, 33, 182, 0.4);
}

.btn:disabled {
  background-color: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
