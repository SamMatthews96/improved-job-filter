<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import Runtime from '@/utils/runtime';
import ConfigPane from '@/components/ConfigPane.vue';
import type { StoredData } from '@/utils/types';

const isShowing = ref(false)
const state = reactive<StoredData>({
  blacklistedJobTitles: [],
  blacklistedCompanies: [],
  websiteFilterCollection: {}
})

Runtime.addEventListener('toggleOverlay', () => {
  isShowing.value = !isShowing.value
})

Runtime.get(['websiteFilterCollection'])
  .then(res => {
    Object.assign(state, res)
    console.log(toRaw(state))
  })

</script>

<template>
  <div
    id="overlay"
    v-if="isShowing"
  >
    <button
      @click="isShowing = false"
      class="overlay-close"
    >Close</button>
    <ConfigPane v-model="state" />

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
