<script setup lang="ts">

import StringInputListItem from "@/components/StringInputListItem.vue";
import Runtime from "@/utils/runtime";
import { state } from "@/utils/state.ts";

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
  Object.assign(state, {
    blacklistedJobTitles: [],
    blacklistedCompanies: [],
  })
}

function toggleOverlay() {
  Runtime.sendMessageToTab('toggleOverlay')
}

Runtime.sendMessageToService('popupOpened', {
  tabId: 1
})

</script>

<template>
  <div class="improved-job-filter-root">
    <button @click="toggleOverlay()">Toggle Overlay</button>
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
