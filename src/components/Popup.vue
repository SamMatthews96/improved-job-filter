<script setup lang="ts">

import { ref, watch, type Ref } from "vue";
import Runtime from "@/utils/runtime";
import { state } from "@/utils/state.ts";
import NewFilterModel from "@/components/NewFilterModel.vue";
import type { FilterProfile } from "@/utils/types";
import FilterProfileEdit from "@/components/FilterProfileEdit.vue";


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

function filterCancel() {
  isNewFilterModal.value = false;
}

function onSelectChange(e: Event) {
  selectedProfileId.value = ((e as InputEvent).target as HTMLSelectElement).value
}

function onDeleteClicked() {
  delete state.filterProfiles[selectedProfileId.value!]
  selectedProfileId.value = Object.keys(state.filterProfiles)[0]
}

const isNewFilterModal = ref(false)
const selectedProfileId: Ref<string | undefined> = ref(undefined)
const filterProfileArray: Ref<{ name: string, filterProfile: FilterProfile }[]> = ref([])

Runtime.sendMessageToService('popupOpened', {
  tabId: 1
})

watch(state, () => {
  filterProfileArray.value =
    Object.entries(state.filterProfiles).map(([name, filterProfile]) => {
      return {
        name, filterProfile
      }
    })
})

</script>

<template>
  <div class="improved-job-filter-root">
    <NewFilterModel
      v-if="isNewFilterModal"
      @create="filterAdded"
      @cancel="filterCancel"
    />
    <div>
      <button @click="toggleOverlay()">Toggle Overlay</button>
      <button @click="addFilterClicked">Add Filter</button>
      <br></br>
      <label for="cars">Choose a car:</label>

      <select
        name="cars"
        id="cars"
        :value="selectedProfileId"
        @change="onSelectChange"
      >
        <option v-for="filterProfile in filterProfileArray">{{ filterProfile.name }}</option>
      </select>

      <FilterProfileEdit
        v-if="selectedProfileId != null"
        :selectedProfileId="selectedProfileId"
        @delete="onDeleteClicked"
      />
    </div>

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
  border-radius: 10px;
  border: solid 2px black;
  max-width: 500px;
  min-height: 200px;

  div {
    padding: 10px;

  }
}
</style>
