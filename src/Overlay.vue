<script setup lang="ts">
import { ref } from 'vue';
import Runtime from './utils/runtime';

console.log('overlay.vue')

const show = ref(true)
// when signal, show = true

Runtime.addEventListener('toggleOverlay', () => {
  
})

</script>

<template>
  <div id="overlay" v-if="show">
    <button @click="show = false" class="overlay-close">Close</button>
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

  .overlay-close {
    position: absolute;
    padding: 10px;
    right: 20px;
    top: 10px;
  }
}



</style>
