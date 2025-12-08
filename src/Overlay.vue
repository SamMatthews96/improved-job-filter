<script setup lang="ts">
import { ref } from 'vue';
import Runtime from '@/utils/runtime';
import ConfigPane from '@/components/ConfigPane.vue';

const isShowing = ref(false)

Runtime.addEventListener('toggleOverlay', () => {
  isShowing.value = !isShowing.value
})

/*
  will need to get storage when opened the first time
  if no storage exists, create an item and store it
*/

</script>

<template>
  <div id="overlay" v-if="isShowing">
    <button @click="isShowing = false" class="overlay-close">Close</button>
    <ConfigPane />

  </div>
</template>


<style scoped lang="scss">
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #88888888;
  pointer-events: none;

  .overlay-close {
    position: absolute;
    padding: 10px;
    right: 20px;
    top: 10px;
    pointer-events: all;
  }


}
</style>
