<script setup lang="ts">
import { ref } from 'vue';
import ConfigPaneSelectContainer from './ConfigPaneSelectContainer.vue';
import type { ElementPath } from '@/utils/types';
import Runtime from '@/utils/runtime';

function onFoundContainer(containerPath: ElementPath, titlePath: ElementPath) {
  showSelectContainer.value = false
  // @todo
  /*
    so at this point we should have identified the container and
    the title field. Save this to the website's config.
  */
  // Runtime.set({

  // })
  console.log('onfound', containerPath, titlePath)
}


const showSelectContainer = ref(true)

</script>

<template>
  <div class="config-pane">
    <h2>Config Pane</h2>
    <ConfigPaneSelectContainer
      @foundContainer="onFoundContainer"
      v-if="showSelectContainer" />




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
