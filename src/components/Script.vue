<script setup lang="ts">

import { ref } from 'vue';
import '@/assets/app-styles.scss'
import WebsiteConfigPane from '@/components/WebsiteConfigPane.vue';

const isShowing = ref(false)

</script>

<template>
  <div class="script">
    <button
      class="open-button"
      @click="isShowing = !isShowing"
    >Open Config</button>
    <WebsiteConfigPane
      :isShowing="isShowing"
      @close="isShowing = false"
    />
  </div>
</template>

<style scoped lang="scss">
.script {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10000;
}

.open-button {
  right: 12px;
  top: 12px;
  padding: 10px;
  display: inline-block;
  position: fixed;
}
</style>
