<script setup lang="ts">
import { ref } from 'vue';
import Runtime from '@/utils/runtime';
import ConfigPane from '@/components/ConfigPane.vue';
import type { WebsiteFilterCollection } from './utils/types';

const isShowing = ref(false)
const websiteFilterCollection = ref<WebsiteFilterCollection>({})

Runtime.addEventListener('toggleOverlay', () => {
  isShowing.value = !isShowing.value
})

Runtime.get<WebsiteFilterCollection>(['websiteFilterCollection'])
  .then(res => {
    console.log('get', res)
    Object.assign(websiteFilterCollection.value, res)
  })

/*
  will need to get storage when opened the first time
  if no storage exists, create an item and store it
*/

</script>

<template>
  <div id="overlay" v-if="isShowing">
    <button @click="isShowing = false" class="overlay-close">Close</button>
    <ConfigPane v-model="websiteFilterCollection"/>

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
