<script setup lang="ts">


// const name = ref("");
// function sendMsgToBg() {
// chrome.runtime.sendMessage(
// { action: "greet", message: { name: name.value } },
// (response) => {
//   if (chrome.runtime.lastError) {
//     console.error(chrome.runtime.lastError);
//   } else {
//     // response.message
//     console.log('bg sent this: ', response)
//     alert(`Response from background: ${response.message}`);
//   }
// }
// );
// }

import { ref, type Ref } from "vue";

const blacklistedJobTitles: Ref<Array<string>> = ref([])
const blacklistedCompanies: Ref<Array<string>> = ref([])

function addCompany() {
  blacklistedCompanies.value.push('')
}

function addJobTitle() {
  blacklistedJobTitles.value.push('')
}


function changeBlacklistedCompany(event: Event, i: number) {
  if (event.target instanceof HTMLInputElement) {
    blacklistedCompanies.value[i] = event.target.value
  }
  console.log(blacklistedCompanies.value)
}

function changeBlacklistedJobTitle(event: Event, i: number) {
  if (event.target instanceof HTMLInputElement) {
    blacklistedJobTitles.value[i] = event.target.value
  }
  console.log(blacklistedJobTitles.value)
}

</script>

<template>
  <!-- <button @click="sendMsgToBg"> Hello </button>, I am: <input v-model="name" /> -->
  <h3>Blacklist Companies</h3>
  <input
    v-for="(company, i) in blacklistedCompanies"
    :key="i"
    @change="e => changeBlacklistedCompany(e, i)"
  ></input>
  <button @click="addCompany">Add Company</button>

  <h3>Blacklist Job Title</h3>
    <input
    v-for="(company, i) in blacklistedJobTitles"
    :key="i"
    @change="e => changeBlacklistedJobTitle(e, i)"
  ></input>
  <button @click="addJobTitle">Add Job Title</button>
</template>

<style scoped>
input {
  padding: 10px;
}
</style>