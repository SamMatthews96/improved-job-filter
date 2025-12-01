<script setup lang="ts">

import { toRaw } from "vue";
import StringInputListItem from "@/components/StringInputListItem.vue";
import { state } from "@/utils/state"
import { type StoredData } from "@/utils/types";

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

function clearConfig() {
  state.blacklistedCompanies = []
  state.blacklistedJobTitles = []
}

function onUpdatedConfig() {
  const newConfig = toRaw(state)
  console.log(newConfig)
  if (!chrome.runtime) {
    console.warn('runtime not found')
    return
  }

  chrome.storage.local.set<StoredData>(newConfig).then(() => {
    console.log("Value is set");
  });
}
</script>

<template>
  <h3>Blacklist Companies</h3>
  <div class="blacklisted-companies">
    <StringInputListItem
      v-for="(_, i) in state.blacklistedCompanies"
      :key="i"
      v-model="state.blacklistedCompanies[i]"
      @delete="() => deleteCompany(i)"
    />
  </div>

  <button @click="state.blacklistedCompanies.push('')">Add Company</button>

  <h3>Blacklist Job Title</h3>
  <StringInputListItem
    v-for="(_, i) in state.blacklistedJobTitles"
    :key="i"
    v-model="state.blacklistedJobTitles[i]"
    @delete="() => deleteJobTitle(i)"
  />

  <br></br><button @click="state.blacklistedJobTitles.push('')">Add Job Title</button>

  <br></br>
  <button @click="clearConfig">Clear</button>
  <button @click="onUpdatedConfig">Save</button>

</template>

<style scoped></style>