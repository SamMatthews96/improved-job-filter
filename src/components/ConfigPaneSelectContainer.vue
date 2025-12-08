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
import { createSelector, getCommonParent, getElementWithText, getUniqueElementPath, getUniqueRelativeElementPaths } from '@/utils/helpers';
import { ref } from 'vue';

const displayMode = ref('start')
const firstSearchName = ref('')
const secondSearchName = ref('')

const showError = ref(false)


const emit = defineEmits<{
  (e: "foundContainer",
    containerSelector: string,

  ): void
}>()
/* ensure the user has input both strings
  user clicks button
  identify container ElementPath
  identify title relative ElementPath
//  */
function onSubmit() {
  const match1 = getElementWithText(firstSearchName.value)
  const match2 = getElementWithText(secondSearchName.value)
  if (!match1 || !match2) return

  const commonParent = getCommonParent(match1, match2)
  if (!commonParent) return;

  const containerPath = getUniqueElementPath(commonParent)
  console.log('container', containerPath)
  console.log(createSelector(containerPath))

  const titlePath = getUniqueRelativeElementPaths(
    [match1, match2], commonParent)
  console.log('title', titlePath)
  console.log(createSelector(titlePath))

  // emit('foundContainer', 'commonParent')

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
