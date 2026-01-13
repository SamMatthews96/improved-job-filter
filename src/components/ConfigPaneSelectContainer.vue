<template>
  <template v-if="displayMode == 'start'">
    <p>Improved Job Filter is unconfigured for this page</p>
    <input
      name="websitePrefix"
      v-model="websitePrefix"
    ></input>
    <p>Please enter the title of the first and second search results:</p>

    <input
      name="firstSearchName"
      v-model="firstSearchName"
    ></input>
    <input
      name="secondSearchName"
      v-model="secondSearchName"
    ></input>
    <button @click="onSubmit">Submit</button>
  </template>
  <p v-if="showError">Sorry, I couldn't identify the container.
    Please double check your spelling and try again.
  </p>


</template>

<script setup lang="ts">
import { identifyContainerAndTitlePaths } from '@/utils/helpers';
import type { ElementPath } from '@/utils/types';
import { ref } from 'vue';

const displayMode = ref('start')
const websitePrefix = ref(window.location.href)
const firstSearchName = ref('')
const secondSearchName = ref('')

const showError = ref(false)


const emit = defineEmits<{
  (e: "foundContainer",
    containerPath: ElementPath,
    titlePath: ElementPath,
    websitePrefix: string
  ): void
}>()

function onSubmit() {
  const { containerPath, titlePath } = identifyContainerAndTitlePaths(
    [firstSearchName.value, secondSearchName.value]
  )
  // @todo, to confirm that we have the correct fields selected
  // we could highlight the identified fields
  // something for search container, and title field
  // if the checks are met, then submit

  emit('foundContainer', containerPath, titlePath, websitePrefix.value)
}


</script>

<style scoped>
input {
  width: calc(100% - 20px);
}
</style>
