<template>
  <template v-if="displayMode == 'start'">
    <p>Improved Job Filter is unconfigured for this page</p>
    <p>Please enter the title of the first and second search results:</p>

    <input name="firstSearchName" v-model="firstSearchName"></input>
    <input name="secondSearchName" v-model="secondSearchName"></input>
    <button @click="onSubmit">Submit</button>
  </template>
  <p v-if="showError">Sorry, I couldn't identify the container.
    Please double check your spelling and try again.
  </p>


</template>

<script setup lang="ts">
import { getCommonParent, getElementWithText, getRelativeSelector } from '@/utils/helpers';
import { ref } from 'vue';

const displayMode = ref('start')
const firstSearchName = ref('')
const secondSearchName = ref('')

const showError = ref(false)

const emit = defineEmits<{
  (e: "foundContainer",
    node: HTMLElement,

  ): void
}>()

function onSubmit() {
  const match1 = getElementWithText(firstSearchName.value)
  const match2 = getElementWithText(secondSearchName.value)

  if (match1 && match2) {
    const commonParent = getCommonParent(match1, match2)
    if (commonParent) {
      getRelativeSelector(commonParent, [match1, match2])

      emit('foundContainer', commonParent)
    } else {

    }
  }
}


</script>

<style scoped>
button {
  cursor: pointer;
  margin: auto;
  display: block;
}

input {
  display: block;
  margin: auto;
  font-size: 20px;
}
</style>
