<script setup lang="ts">

import { ref } from 'vue';
import type { ElementPath } from '@/utils/types';
import {
  currentWebsiteSettings,
  state,
} from '@/utils/state'
import WebsiteSelectContainer from '@/components/WebsiteSelectContainer.vue';
import WebsiteSettings from './WebsiteSettings.vue';
import FilterProfiles from './FilterProfiles.vue';


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

const showSelectContainer = ref(false)
const props = defineProps<{
  isShowing: boolean
}>()
const emit = defineEmits<{
  (e: "close"): void
}>()

</script>

<template>
  <div class="config-pane" v-if="isShowing">
    <button @click="emit('close')" class="close-button">Close</button>
    <h2>Website Config Pane</h2>

    <WebsiteSelectContainer @foundContainer="addWebsiteFilter" v-if="!currentWebsiteSettings?.containerProperties" />
    <template v-else>
      <WebsiteSettings />
      <FilterProfiles />
    </template>
  </div>

</template>


<style scoped lang="scss">
.settings-container {
  padding: 2px;
  background-color: #eee;
}

.close-button {
  position: absolute;
  padding: 5px;
  right: 5px;
  top: 5px;
}

h2 {
  margin: 0;
  background-color: #d7fffd;
  padding: 8px;
  border-bottom: #bcbcbc 1px solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.config-pane {
  display: inline-block;
  position: fixed;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  pointer-events: all;
  min-width: 400px;
  background: #fff;
  border: solid 2px black;
}
</style>
