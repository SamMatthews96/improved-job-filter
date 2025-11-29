<script setup lang="ts">

import { ref } from "vue";

const name = ref("");

function sendMsgToBg() {
  console.log(chrome)
  chrome.runtime.sendMessage(
    { action: "greet", message: { name: name.value } },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('bg sent this: ', response)
        alert(`Response from background: ${response.message}`);
      }
    }
  );
}
</script>

<template>
  <button @click="sendMsgToBg"> Hello </button>, I am: <input v-model="name" />
</template>

<style scoped>
input {
  padding: 10px;
}
</style>