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
import { highlightContainerPath } from '@/utils/state';
import type { ElementPath } from '@/utils/types';
import { ref, watch } from 'vue';

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
  const paths = identifyContainerAndTitlePaths(
    [firstSearchName.value, secondSearchName.value]
  )
  if (!paths) return
  const { containerPath, titlePath } = paths

  highlightContainerPath.value = undefined
  emit('foundContainer', containerPath, titlePath, websitePrefix.value)
}

watch([firstSearchName, secondSearchName], () => {
  const paths = identifyContainerAndTitlePaths(
    [firstSearchName.value, secondSearchName.value]
  )
  if (!paths) {
    highlightContainerPath.value = undefined
    return
  }
  const { containerPath } = paths
  highlightContainerPath.value = containerPath
})

</script>

<style scoped>
input {
  width: calc(100% - 20px);
}
</style>
