<script setup lang="ts">

import StringInputListItem from "@/components/StringInputListItem.vue";

import { state, type StoredData } from "@/state"


chrome.storage?.local
  ?.get<StoredData>(["blacklistedJobTitles", "blacklistedCompanies"])
  .then((result) => {
    console.log('result', result)
    if (result.blacklistedJobTitles) {
      Object.values(result.blacklistedJobTitles)?.forEach(jobTitle => {
        state.blacklistedJobTitles.push(jobTitle)
      })
    }
    if (result.blacklistedCompanies) {
      Object.values(result.blacklistedCompanies)?.forEach(company => {
        state.blacklistedCompanies.push(company)
      })
    }

  });



function addCompany() {
  state.blacklistedCompanies.push('')
}

function addJobTitle() {
  state.blacklistedJobTitles.push('')
}

function deleteCompany(index: number) {
  state.blacklistedCompanies = state.blacklistedCompanies.filter((e, i) => {
    return i != index
  })
}

function deleteJobTitle(index: number) {
  state.blacklistedJobTitles = state.blacklistedJobTitles.filter((e, i) => {
    return i != index
  })
}


function onUpdatedConfig() {
  console.log('config', state)

  if (!chrome.runtime) {
    console.warn('runtime not found')
    return
  }
  chrome.storage.local.set(state).then(() => {
    console.log("Value is set");
  });

  chrome.runtime.sendMessage({
    action: "updatedConfig", message: state
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  })
}
</script>

<template>
  <h3>Blacklist Companies</h3>
  <StringInputListItem
    v-for="(_, i) in state.blacklistedCompanies"
    :key="i"
    v-model="state.blacklistedCompanies[i]"
    @delete="() => deleteCompany(i)"
  />

  <button @click="addCompany">Add Company</button>

  <h3>Blacklist Job Title</h3>
  <StringInputListItem
    v-for="(_, i) in state.blacklistedJobTitles"
    :key="i"
    v-model="state.blacklistedJobTitles[i]"
    @delete="() => deleteJobTitle(i)"
  />

  <button @click="addJobTitle">Add Job Title</button>

</template>

<style scoped></style>