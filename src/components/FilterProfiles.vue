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
const isOpen = ref(false)

</script>

<template>
  <div class="container">
    <div class="header">
      <h3>Filter Settings</h3>
      <button @click="isOpen = !isOpen">
        {{ isOpen ? '-' : '+' }}
      </button>
    </div>

    <template v-if="isOpen">
      <NewFilterModel v-if="isNewFilterModal" @create="filterAdded" @cancel="filterCancel" />

      <select name="filter-profile" id="filter-profile" v-model="state.filterProfileSettings.selectedFilterId">
        <option v-for="filterProfile in filterProfileArray">{{ filterProfile.name }}</option>
      </select>
      <button @click="addFilterClicked">Add Filter Profile</button>

      <PopupEditFilterProfile v-if="selectedFilterProfile" :filterProfile="selectedFilterProfile"
        @delete="deleteSelectedFilter()" />
    </template>

  </div>
</template>

<style lang="scss" scoped>
.container {
  border-top: solid 1px #bcbcbc;
  padding: 2px 2px 5px 2px;
  background-color: #d7fffd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0;
  }
}
</style>
