<script setup lang="ts">

import Runtime from "@/utils/runtime";
import { state } from "@/utils/state.ts";
import NewFilterModel from "@/components/NewFilterModel.vue";
import { ref } from "vue";

function addFilterClicked() {
  isNewFilterModal.value = !isNewFilterModal.value;
}

function toggleOverlay() {
  Runtime.sendMessageToTab('toggleOverlay')
}

function filterAdded(name: string) {
  state.filterProfiles[name] = {}
  isNewFilterModal.value = false;
}

const isNewFilterModal = ref(false)

Runtime.sendMessageToService('popupOpened', {
  tabId: 1
})

</script>

<template>
  <div class="improved-job-filter-root">
    <NewFilterModel
      v-if="isNewFilterModal"
      @create="filterAdded"
    />
    <button @click="toggleOverlay()">Toggle Overlay</button>
    <br></br>
    <button @click="addFilterClicked">Add Filter</button>

  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

.improved-job-filter-root {
  position: relative;
  color: #bbb;
  background: #444;
  /* padding: 10px; */
  border-radius: 10px;
  border: solid 2px black;
  max-width: 500px;
  min-height: 200px;
}
</style>
