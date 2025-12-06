<script setup lang="ts">

import { ref, type Ref } from "vue";
import StringInputListItem from "@/components/StringInputListItem.vue";
import { type StoredData } from "@/utils/types";
import Runtime from "@/utils/runtime";

function deleteCompany(index: number) {
  state.value.blacklistedCompanies = state.value.blacklistedCompanies.filter((e, i) => {
    return i != index
  })
}

function deleteJobTitle(index: number) {
  state.value.blacklistedJobTitles = state.value.blacklistedJobTitles.filter((e, i) => {
    return i != index
  })
}

function clearConfig() {
  state.value = {
    blacklistedJobTitles: [],
    blacklistedCompanies: [],
  }
  onUpdatedConfig()
}

function toggleOverlay() {
  Runtime.sendMessageToTab('toggleOverlay')
}

function onUpdatedConfig() {
  clearTimeout(updatedTimeoutId.value)
  updatedTimeoutId.value = setTimeout(() => {
    Runtime.set<StoredData>(state.value)
  }, timeoutLength)
}

const timeoutLength: number = 300;
const updatedTimeoutId: Ref<number> = ref(0)
const state: Ref<StoredData> = ref({
  blacklistedJobTitles: [],
  blacklistedCompanies: [],
})

Runtime.get<StoredData>(["blacklistedJobTitles", "blacklistedCompanies"])
  .then((result) => {
    state.value = result
  })
  .catch(() => {
    console.error('[20251203.0023] Failed to get StoredData')
  })

Runtime.injectScript()
  .then(() => console.log('injected script'));

function bgMsg(){
  chrome.runtime.sendMessage({key:'123'})
}

</script>

<template>
  <button @click="toggleOverlay()">Toggle Overlay</button>
  <button @click="bgMsg">BG test</button>
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
