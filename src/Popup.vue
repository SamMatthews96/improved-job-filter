<script setup lang="ts">

import { toRaw, ref, type Ref } from "vue";
import StringInputListItem from "@/components/StringInputListItem.vue";
import { state } from "@/utils/state"
import { type StoredData } from "@/utils/types";
import Runtime from "@/utils/runtime";

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
  onUpdatedConfig()
}

function onUpdatedConfig() {
  clearTimeout(updatedTimeoutId.value)
  updatedTimeoutId.value = setTimeout(() => {
    const newConfig = toRaw(state)
    Runtime.set<StoredData>(newConfig)
  }, timeoutLength)
}

const timeoutLength: number = 300;
const updatedTimeoutId: Ref<number> = ref(0)

Runtime.get<StoredData>(["blacklistedJobTitles", "blacklistedCompanies"])
  .then((result) => {
    result.blacklistedJobTitles.forEach(jobTitle => {
      state.blacklistedJobTitles.push(jobTitle)
    })
    result.blacklistedCompanies.forEach(company => {
      state.blacklistedCompanies.push(company)
    })
    state.lastUpdated = (new Date()).toISOString()
    Runtime.set<StoredData>(state)
  })
  .catch(result => {
    console.error('[20251203.0023] Failed to get StoredData')
  })
</script>

<template>
  <h3>Blacklist Companies</h3>
  <div class="blacklisted-companies">
    <StringInputListItem v-for="(_, i) in state.blacklistedCompanies" :key="i" v-model="state.blacklistedCompanies[i]"
      @delete="() => deleteCompany(i)" @input="onUpdatedConfig()" />
  </div>

  <button @click="state.blacklistedCompanies.push('')">Add Company</button>

  <h3>Blacklist Job Title</h3>
  <StringInputListItem v-for="(_, i) in state.blacklistedJobTitles" :key="i" v-model="state.blacklistedJobTitles[i]"
    @delete="() => deleteJobTitle(i)" @input="onUpdatedConfig()" />

  <br></br><button @click="state.blacklistedJobTitles.push('')">Add Job Title</button>

  <br></br>
  <button @click="clearConfig">Clear</button>

</template>

<style scoped></style>
