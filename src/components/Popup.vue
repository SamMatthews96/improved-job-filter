<script setup lang="ts">

import Runtime from "@/utils/runtime";

async function enableCurrentPage() {
  const tab = await Runtime.getCurrentTab()
  if (!tab?.id) {
    throw new Error('[20260111.2235]')
  }
  Runtime.sendMessageToService('enableCurrentPage', {
    tab
  })
}

</script>

<template>
  <div class="popup">
    <button @click="enableCurrentPage()">Enable Page Script</button>
  </div>
</template>

<style scoped>
.popup {
  position: relative;
  background-color: white;
  max-width: 180px;
  padding: 10px;
}
</style>

<style>
/* Keep this to remove white border in prod version */
html,
body {
  margin: 0;
  padding: 0;
}
</style>
