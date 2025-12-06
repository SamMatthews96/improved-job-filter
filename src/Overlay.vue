<template>
  <div id="overlay" v-if="show">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false)
</script>

<style scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #88888888;
  pointer-events: none;
}
</style>
