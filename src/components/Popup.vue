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

async function enableCurrentPage() {
  const tab = await Runtime.getCurrentTab()
  if (!tab?.id){
    throw new Error('[20260111.2235]')
  }
  console.log('enabledCurrentPage clicked')
  Runtime.sendMessageToService('enableCurrentPage', {
    tab
  })
}

function filterAdded(name: string) {
  state.filterProfileSettings.profiles[name] = {}
  isNewFilterModal.value = false;
  if (state.filterProfileSettings.selectedFilterId == undefined) {
    state.filterProfileSettings.selectedFilterId = name
  }
}

function filterCancel() {
  isNewFilterModal.value = false;
}

function onDeleteClicked() {
  const selectedFilterId = state.filterProfileSettings.selectedFilterId
  delete state.filterProfileSettings.profiles[selectedFilterId!]
  const firstKey = Object.keys(state.filterProfileSettings.profiles)[0]
  if (firstKey) {
    state.filterProfileSettings.selectedFilterId = firstKey;
  }
}

const isNewFilterModal = ref(false)
const filterProfileArray: Ref<{ name: string, filterProfile: FilterProfile }[]> = ref([])

watch(state, () => {
  filterProfileArray.value =
    Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
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
      <button @click="enableCurrentPage()">Enable current page</button>
      <button @click="addFilterClicked">Add Filter Profile</button>
      <br></br>

      <select
        name="cars"
        id="cars"
        v-model="state.filterProfileSettings.selectedFilterId"
      >
        <option v-for="filterProfile in filterProfileArray">{{ filterProfile.name }}</option>
      </select>

      <FilterProfileEdit
        v-if="state.filterProfileSettings.selectedFilterId != undefined &&
          state.filterProfileSettings.profiles[state.filterProfileSettings.selectedFilterId]"
        :selectedProfileId="state.filterProfileSettings.selectedFilterId"
        @delete="onDeleteClicked"
      />
    </div>

  </div>
</template>

<style scoped>
button {
  font-size: 18px;
  cursor: pointer;
}

select {
  font-size: 18px;
}

.improved-job-filter-root {
  position: relative;
  color: #bbb;
  background: #444;
  border: solid 2px black;
  max-width: 500px;
  min-width: 400px;
  min-height: 200px;

  &>div {
    padding: 10px;
  }
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
