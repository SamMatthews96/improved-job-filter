<script setup lang="ts">
import { ref } from 'vue';
import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import type { StoredData, ElementPath } from '@/utils/types';
import Runtime from '@/utils/runtime';
import WebsiteFieldConfig from './WebsiteFieldConfig.vue';

function addWebsiteFilter(
  containerPath: ElementPath,
  titlePath: ElementPath,
  websitePrefix: string
) {
  showSelectContainer.value = false

  Runtime.set({
    websiteFilterCollection: {
      [websitePrefix]: {
        selectedFilterId: 1,
        containerProperties: containerPath,
        fieldProperties: {
          title: titlePath
        }
      }
    }

  })
  console.log('onfound', containerPath, titlePath, websitePrefix)
}

const state = defineModel<StoredData>()
const showSelectContainer = ref(false)


const match = (window.location.href).match(/^https?:\/\/[^\/]+\//)!
const isSaved = Boolean(state.value?.websiteFilterCollection[match[0]])
if (isSaved){
  console.log(state.value?.websiteFilterCollection[match[0]])
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
      :filter="state?.websiteFilterCollection[match[0]]!"
    />



  </div>
</template>

<style lang="scss" scoped>
.config-pane {
  display: inline-block;
  position: absolute;
  background-color: black;
  right: 20px;
  top: 60px;
  padding: 10px;
  border-radius: 10px;
  pointer-events: all;
}
</style>
