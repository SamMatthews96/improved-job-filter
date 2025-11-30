<script setup lang="ts">


import { ref, type Ref } from "vue";

interface StoredData {
  blacklistedJobTitles: string[];
  blacklistedCompanies: string[];
}

const blacklistedJobTitles: Ref<Array<string>> = ref([])
const blacklistedCompanies: Ref<Array<string>> = ref([])

// @todo load storage
chrome.storage?.local
  ?.get<StoredData>(["blacklistedJobTitles", "blacklistedCompanies"])
  .then((result) => {
    console.log('result', result)
    if (result.blacklistedJobTitles) {
      Object.values(result.blacklistedJobTitles)?.forEach(jobTitle => {
        blacklistedJobTitles.value.push(jobTitle)
      })
    }
    if (result.blacklistedCompanies) {
      Object.values(result.blacklistedCompanies)?.forEach(company => {
        blacklistedCompanies.value.push(company)
      })
    }

  });



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
  onUpdatedConfig()
}

function changeBlacklistedJobTitle(event: Event, i: number) {
  if (event.target instanceof HTMLInputElement) {
    blacklistedJobTitles.value[i] = event.target.value
  }
  onUpdatedConfig()
}

function onUpdatedConfig() {
  if (!chrome.runtime) {
    console.warn('runtime not found')
    return
  }
  const newSettings = {
    blacklistedJobTitles: blacklistedJobTitles.value,
    blacklistedCompanies: blacklistedCompanies.value
  }
  // @todo save storage
  chrome.storage.local.set(newSettings).then(() => {
    console.log("Value is set");
  });

  chrome.runtime.sendMessage({
    action: "updatedConfig", message: newSettings
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('bg sent this: ', response.message)
    }
  })
}



</script>

<template>
  <h3>Blacklist Companies</h3>
  <input
    v-for="(_, i) in blacklistedCompanies"
    :key="i"
    :value="blacklistedCompanies[i]"
    @change="e => changeBlacklistedCompany(e, i)"
  ></input>
  <button @click="addCompany">Add Company</button>

  <h3>Blacklist Job Title</h3>
  <input
    v-for="(_, i) in blacklistedJobTitles"
    :key="i"
    :value="blacklistedJobTitles[i]"
    @change="e => changeBlacklistedJobTitle(e, i)"
  ></input>
  <button @click="addJobTitle">Add Job Title</button>
</template>

<style scoped>
input {
  padding: 5px;
}
</style>