<script setup lang="ts">

import StringInputListItem from "@/components/StringInputListItem.vue";
import Runtime from "@/utils/runtime";
import { state } from "@/utils/state.ts";

function deleteCompany(index: number) {
  // state.blacklistedCompanies = state.blacklistedCompanies.filter((e, i) => {
  //   return i != index
  // })
}

function deleteJobTitle(index: number) {
  // state.blacklistedJobTitles = state.blacklistedJobTitles.filter((e, i) => {
  //   return i != index
  // })
}

function clearConfig() {
  Object.assign(state, {
    blacklistedJobTitles: [],
    blacklistedCompanies: [],
  })
}

function toggleOverlay() {
  Runtime.sendMessageToTab('toggleOverlay')
}

function addFilter(){

}

Runtime.sendMessageToService('popupOpened', {
  tabId: 1
})

</script>

<template>
  <div class="improved-job-filter-root">
    <button @click="toggleOverlay()">Toggle Overlay</button>
    
    <br></br>
    <button @click="addFilter">Add Filter</button>
    <button @click="clearConfig">Clear</button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

.improved-job-filter-root {
  color: #bbb;
  background: #444;
  padding: 10px;
  border-radius: 10px;
  border: solid 2px black;
  max-width: 500px;
}
</style>
