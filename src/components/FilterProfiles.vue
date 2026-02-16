<script setup lang="ts">

import { ref } from "vue";
import { selectedFilterProfile, state, filterProfileArray, selectedFilterProfileId } from "@/utils/state.ts";
import NewFilterModel from "@/components/NewFilterModel.vue";

import '@/assets/app-styles.scss'
import PopupEditFilterProfile from "./PopupEditFilterProfile.vue";

function addFilterClicked() {
  isNewFilterModal.value = !isNewFilterModal.value;
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
  <div class="container">
    <NewFilterModel v-if="isNewFilterModal" @create="filterAdded" @cancel="filterCancel" />
    <div>
      <button @click="addFilterClicked">Add Filter Profile</button>
      <br></br>

      <select name="filter-profile" id="filter-profile" v-model="state.filterProfileSettings.selectedFilterId">
        <option v-for="filterProfile in filterProfileArray">{{ filterProfile.name }}</option>
      </select>

      <PopupEditFilterProfile v-if="selectedFilterProfile" :filterProfile="selectedFilterProfile"
        @delete="deleteSelectedFilter()" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.container {
  border-top: solid 1px #eee;
  padding: 2px;
}
</style>
