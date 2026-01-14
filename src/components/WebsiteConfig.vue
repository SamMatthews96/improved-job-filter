<script setup lang="ts">

import { ref, watch, type Ref } from 'vue';
import type { ElementPath, FilterProfileList } from '@/utils/types';
import { state } from '@/utils/state'
import { getWindowUrl } from '@/utils/helpers';

import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import AddWebsiteFilterField from '@/components/AddWebsiteFilterField.vue';
import WebsiteFieldConfig from './WebsiteFieldConfig.vue';

import '@/assets/app-styles.scss'

const isShowing = ref(false)

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

function getFilterProfileList(): FilterProfileList {
  return Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
    return {
      name, filterProfile
    }
  })
}

const showSelectContainer = ref(false)
const match = getWindowUrl()

const filterProfileArray: Ref<FilterProfileList> = ref(getFilterProfileList())
watch(state, () => {
  filterProfileArray.value = getFilterProfileList()
})

</script>

<template>
  <div class="script">
    <button
      class="open-button"
      @click="isShowing = !isShowing"
    >Open Config</button>
    <div
      class="config-pane content-container"
      v-if="isShowing"
    >
      <button
        @click="isShowing = false"
        class="close-button"
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
        <WebsiteFieldConfig 
          :filter="state.websiteFilterSettings[match]!"
          @delete-container="delete state.websiteFilterSettings[match]"
        />
        <AddWebsiteFilterField />
      </template>

    </div>
  </div>


</template>


<style scoped lang="scss">
.script {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10000;
}

.close-button {
  position: absolute;
  padding: 10px;
  right: 5px;
  top: 5px;
}

.open-button {
  right: 12px;
  top: 12px;
  padding: 10px;
  display: inline-block;
  position: fixed;
}

h2 {
  margin-top: 5px;
}

.config-pane {
  display: inline-block;
  position: fixed;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  pointer-events: all;
  min-width: 400px;
}
</style>
