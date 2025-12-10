<script setup lang="ts">
import { ref } from 'vue';
import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import AddWebsiteFilterField from '@/components/AddWebsiteFilterField.vue';
import type { ElementPath } from '@/utils/types';
import WebsiteFieldConfig from './WebsiteFieldConfig.vue';
import { state } from '@/utils/state'


function addWebsiteFilter(
  containerPath: ElementPath,
  titlePath: ElementPath,
  websitePrefix: string
) {
  showSelectContainer.value = false
  state.websiteFilterSettings = {
    [websitePrefix]: {
      selectedFilterId: 1,
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

const showSelectContainer = ref(false)

const match = (window.location.href).match(/^https?:\/\/[^\/]+\//)![0]

</script>

<template>
  <div class="config-pane">
    <h2>Config Pane</h2>
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
  min-width: 400px;
}
</style>
