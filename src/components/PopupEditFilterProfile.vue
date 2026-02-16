<template>
  <div>Fields:</div>
  <FieldName
    v-for="(fieldName, i) in props.filterProfile.fieldNames"
    :field-name="fieldName"
    @delete-field="deleteField(i)"
    @rename-field="name => renameField(name, i)"
  />
  <button @click="addField('New Field')">+</button>
  <AddMissingFields :missing-filter-fields="currentFilterProfileMissingFields"
    @add-field="fieldName => addField(fieldName)" />

  <div>Show search results where:</div>
  <PopupEditFilter :filter="props.filterProfile.filter" @delete="emit('delete')"
    :filter-recursion-level="filterRecursionLevel" />
</template>

<script setup lang="ts">

import type { FilterProfile } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';
import AddMissingFields from './AddMissingFields.vue';
import { currentFilterProfileMissingFields } from '@/utils/state';
import FieldName from './FieldName.vue';

function addField(fieldName: string) {
  if (!fieldName) return;
  props.filterProfile.fieldNames.push(fieldName)
}

function renameField(fieldName: string, index: number){
  props.filterProfile.fieldNames[index] = fieldName
}

function deleteField(index: number){
  props.filterProfile.fieldNames = props.filterProfile.fieldNames.filter((_,i) => {
    return i !== index
  })
}

const props = defineProps<{ filterProfile: FilterProfile }>()

const filterRecursionLevel = 0

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
