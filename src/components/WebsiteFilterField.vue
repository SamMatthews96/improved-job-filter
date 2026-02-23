<template>
  <div :class="['website-field-config', matchStatus]" @mouseenter="!isEditMode && emit('highlight-on')"
    @mouseleave="emit('highlight-off')">
    <input v-if="isEditModeName" />
    <span v-else>{{ fieldName }}</span>
    <button @click="isEditModeName = !isEditModeName">E</button>
    <span class="field-button-container">
      <span v-if="isEditMode" class="edit-mode">
        <input v-model="textValue">
        <span>
          <button @click="onAccept()" :disabled="!elementPath">Ok</button>
          <button @click="isEditMode = false; textValue = ''">Cancel</button>
        </span>
      </span>
      <template v-else>
        <button @click="isEditMode = true; emit('highlight-off')">Edit</button>
      </template>
      <span>
        <button @click="onDeleteClicked()" @focusout="isConfirmDelete = false" @mouseleave="isConfirmDelete = false">
          {{ isConfirmDelete ? 'Confirm?' : 'Delete' }}
        </button>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { currentWebsiteSettings } from '@/utils/state';
import { getElementWithPath, identifyFieldChildPath } from '@/utils/elementFunctions';
import emitter from '@/utils/emitter';
import type { ElementPath } from '@/utils/types';

function onAccept() {
  if (!elementPath.value) return
  isEditMode.value = false;
  textValue.value = ''
  currentWebsiteSettings.value!.fieldProperties[props.fieldName] = elementPath.value

  matchStatus.value = checkMatchStatus()
}

function onDeleteClicked() {
  if (isConfirmDelete.value) {
    emit('delete')
  } else {
    isConfirmDelete.value = true
  }
}

function checkMatchStatus() {
  const elementPath = currentWebsiteSettings.value?.fieldProperties[props.fieldName]
  if (!elementPath) return 'invalid'
  const container = getElementWithPath(currentWebsiteSettings.value!.containerProperties!)
  if (!container) return 'invalid'

  const elements = []
  for (let i = 0; i < container.children.length; i++) {
    const jobElement = container.children[i] as HTMLElement
    const element = getElementWithPath(elementPath, jobElement)
    if (!element) continue
    elements.push(element)
  }

  if (elements.length) {
    return 'valid'
  } else {
    return 'invalid'
  }
}

const isEditMode = ref(false)
const isEditModeName = ref(false)
const isConfirmDelete = ref(false)
const textValue = ref('')
const props = defineProps<{ fieldName: string }>()
const emit = defineEmits<{
  (e: 'delete'): void,
  (e: 'highlight-on'): void,
  (e: 'highlight-off'): void,
}>()
const matchStatus = ref(checkMatchStatus())
const elementPath: Ref<ElementPath | undefined> = ref(undefined)

watch(textValue, () => {
  elementPath.value = identifyFieldChildPath(
    currentWebsiteSettings.value!.containerProperties!,
    textValue.value)
  emitter.emit('filter-edit-field-updated', textValue.value)
})

</script>

<style scoped lang="scss">
.website-field-config {
  border: 2px solid;
  padding: 3px;
  margin: 2px;
  display: flex;
  justify-content: space-between;
  cursor: default;
}

.valid {
  border-color: green;
}

.invalid {
  border-color: orangered;
}

input {
  width: 200px;
}

.field-button-container {
  display: flex;
}

.edit-mode {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
