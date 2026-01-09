<script setup lang="ts">

import { ref, watch, type Ref } from 'vue';
import Runtime from '@/utils/runtime';
import type { ElementPath, FilterProfile, FilterProfileList } from '@/utils/types';
import { state } from '@/utils/state'

import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import AddWebsiteFilterField from '@/components/AddWebsiteFilterField.vue';
import WebsiteFieldConfig from './WebsiteFieldConfig.vue';

const isShowing = ref(false)

Runtime.addEventListener('toggleOverlay', () => {
  isShowing.value = !isShowing.value
})

function addWebsiteFilter(
  containerPath: ElementPath,
  titlePath: ElementPath,
  websitePrefix: string
) {
  showSelectContainer.value = false
  state.websiteFilterSettings = {
    [websitePrefix]: {
      selectedFilterId: undefined,
      containerProperties: containerPath,
      fieldProperties: {
        title: titlePath
      }
    }
  }
}

function clearSiteData() {
  delete state.websiteFilterSettings[match]
}

function getFilterProfileList(): FilterProfileList {
  return Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
    return {
      name, filterProfile
    }
  })
}

const showSelectContainer = ref(false)
const match = (window.location.href).match(/^https?:\/\/[^\/]+\//)![0]

const filterProfileArray: Ref<FilterProfileList> = ref(getFilterProfileList())
watch(state, () => {
  filterProfileArray.value = getFilterProfileList()
})





</script>

<template>
  <div
    class="config-pane"
    v-if="isShowing"
  >
    <button
      @click="isShowing = false"
      class="overlay-close-button"
    >Close</button>
    <h2>Website Config Pane</h2>
    <label for="profile">Profile: </label>
    <select
      name="profile"
      v-model="state.websiteFilterSettings[match]!.selectedFilterId"
      v-if="state.websiteFilterSettings[match]"
    >
      <option
        v-for="filterProfile in filterProfileArray"
        :value="filterProfile.name"
      >{{ filterProfile.name }}</option>
    </select>
    <br></br>
    <ConfigPaneSelectContainer
      @foundContainer="addWebsiteFilter"
      v-if="!(state.websiteFilterSettings[match])"
    />
    <template v-else>
      <WebsiteFieldConfig :filter="state.websiteFilterSettings[match]!" />
      <AddWebsiteFilterField />
      <br></br>
      <button @click="clearSiteData">Clear Site Data</button>
    </template>

  </div>

</template>


<style scoped lang="scss">
.overlay-close-button {
  position: absolute;
  padding: 10px;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

h2 {
  margin-top: 5px;
}

.config-pane {
  display: inline-block;
  position: absolute;
  background-color: #444;
  color: #bbb;
  right: 10px;
  top: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px black solid;
  pointer-events: all;
  min-width: 400px;
}
</style>
