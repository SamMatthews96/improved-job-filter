<script setup lang="ts">
import { ref } from 'vue';
import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import type { ElementPath } from '@/utils/types';
import WebsiteFieldConfig from './WebsiteFieldConfig.vue';
import { state } from '@/utils/state'


function addWebsiteFilter(
  containerPath: ElementPath,
  titlePath: ElementPath,
  websitePrefix: string
) {
  showSelectContainer.value = false
  state.websiteFilterCollection = {
    [websitePrefix]: {
      selectedFilterId: 1,
      containerProperties: containerPath,
      fieldProperties: {
        title: titlePath
      }
    }
  }
}

const showSelectContainer = ref(false)

const match = (window.location.href).match(/^https?:\/\/[^\/]+\//)!
const isSaved = Boolean(state.websiteFilterCollection[match[0]])
if (isSaved) {
  console.log(state.websiteFilterCollection[match[0]])
}
// if it is not saved, we take the user through the selectContainer process
showSelectContainer.value = !isSaved

</script>

<template>
  <div class="config-pane">
    <h2>Config Pane</h2>
    <ConfigPaneSelectContainer
      @foundContainer="addWebsiteFilter"
      v-if="showSelectContainer"
    />
    <WebsiteFieldConfig
      v-else
      :filter="state.websiteFilterCollection[match[0]]!"
    />



  </div>
</template>

<style lang="scss" scoped>
.config-pane {
  display: inline-block;
  position: absolute;
  background-color: #444;
  color: #bbb;
  right: 20px;
  top: 60px;
  padding: 10px;
  border-radius: 10px;
  border: 2px black solid;
  pointer-events: all;
}
</style>
