<script setup>
import {ref } from 'vue'

const items = ref([{
    title: "What is HTML?",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.",
    open: false,
  },
  {
    title: "What is CSS?",
    content:
      "Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
    open: false,
  },
  {
    title: "What is JS?",
    content:
      "JavaScript, often abbreviated as JS, is a programming language and core technology of the World Wide Web, alongside HTML and CSS. As of 2023, 98.7% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries.",
    open: false,
  },
]);

const toogleAccordion =(index) =>{
  items.value = items.value.map((item, i) =>({
    ...item,
    open: i === index ? !item.open : false,
  }))
};
</script>
<template>
  <div class="accordion-container">
    <div v-for="(item, index) in items" :key="index" class="accordion">
      <div class="accordion-header" @click="toogleAccordion(index)">
        {{ item.title }}
        <span class="arrow-icon">{{ item.open ? "▼" : "▶" }}</span>
      </div>
      <div v-show="item.open" class="accordion-content">
        {{ item.content }}
      </div>
    </div>

   
  </div>
</template>

<style scoped>
.accordion-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 0 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.accordion {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.accordion-header {
  background-color: #f7f9fc;
  color: #333;
  padding: 18px 24px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.accordion-header:hover {
  background-color: #e3e9f0;
}

.arrow-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.accordion-content {
  padding: 18px 24px;
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
  color: #444;
  line-height: 1.6;
  animation: fadeIn 0.3s ease;
}

.accordion-content[style] {
  display: block;
}

.accordion-header .arrow-icon {
  transform: rotate(0deg);
}

.accordion-header .arrow-icon:has(+ .accordion-content[style]) {
  transform: rotate(90deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

