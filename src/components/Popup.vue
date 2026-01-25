<script setup lang="ts">

import { ref } from "vue";
import Runtime from "@/utils/runtime";
import { selectedFilterProfile, state, filterProfileArray, selectedFilterProfileId } from "@/utils/state.ts";
import NewFilterModel from "@/components/NewFilterModel.vue";
import PopupEditFilter from "@/components/PopupEditFilter.vue";

import '@/assets/app-styles.scss'
import PopupEditFilterProfile from "./PopupEditFilterProfile.vue";

function addFilterClicked() {
  isNewFilterModal.value = !isNewFilterModal.value;
}

async function enableCurrentPage() {
  const tab = await Runtime.getCurrentTab()
  if (!tab?.id) {
    throw new Error('[20260111.2235]')
  }
  Runtime.sendMessageToService('enableCurrentPage', {
    tab
  })
}

function filterAdded(name: string) {
  state.filterProfileSettings.profiles[name] = {
    fieldNames: [],
    filter: {
      filterType: 'collection',
      collectionType: 'every',
      subFilters: []
    }
  }
  isNewFilterModal.value = false;
  state.filterProfileSettings.selectedFilterId = name
}

function filterCancel() {
  isNewFilterModal.value = false;
}

function deleteSelectedFilter() {
  delete state.filterProfileSettings.profiles[selectedFilterProfileId.value!]
  const firstKey = Object.keys(state.filterProfileSettings.profiles)[0]
  if (firstKey) {
    state.filterProfileSettings.selectedFilterId = firstKey;
  }
}

const isNewFilterModal = ref(false)

</script>

<template>
  <div class="popup content-container">
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
        name="filter-profile"
        id="filter-profile"
        v-model="state.filterProfileSettings.selectedFilterId"
      >
        <option v-for="filterProfile in filterProfileArray">{{ filterProfile.name }}</option>
      </select>

      <PopupEditFilterProfile
        v-if="selectedFilterProfile"
        :filterProfile="selectedFilterProfile"
        @delete="deleteSelectedFilter()"
      />
    </div>

  </div>
</template>

<style scoped>
.popup {
  position: relative;
  width: 550px;
  min-height: 200px;
}
</style>

<style>
/* Keep this to remove white border in prod version */
html,
body {
  margin: 0;
  padding: 0;
}
</style>
