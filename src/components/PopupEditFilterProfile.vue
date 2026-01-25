<template>
  <div>
    <div>Fields:</div>
    <div>
      <span class="field-name" v-for="fieldName in props.filterProfile.fieldNames">{{ fieldName }}</span>
    </div>
    <input v-model="addFieldValue" />
    <button @click="addField">Add Field</button>
  </div>
  <PopupEditFilter :filter="props.filterProfile.filter" @delete="emit('delete')" />
</template>

<script setup lang="ts">

import type { FilterProfile } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';
import { ref } from 'vue';

function addField() {
  if (!addFieldValue.value) return;
  props.filterProfile.fieldNames.push(addFieldValue.value)
}

const props = defineProps<{ filterProfile: FilterProfile }>()
const addFieldValue = ref('')

console.log(props.filterProfile)

const emit = defineEmits<{
  (e: 'delete'): void
}>()

</script>

<style lang="scss" scoped>
.field-name {
  padding: 3px 8px 3px 8px;
  margin: 2px;
  background-color: #2065a480;
  border-radius: 15px;
}
</style>
