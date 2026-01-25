<template>
  <div>
    <div>Fields:</div>
    <div>
      <span class="field-name" v-for="fieldName in props.filterProfile.fieldNames">{{ fieldName }}</span>
    </div>
    <AddMissingFields
      :missing-filter-fields="currentFilterProfileMissingFields"
      @add-field="fieldName => addField(fieldName)"
    />
    <input v-model="addFieldValue" />
    <button @click="addField(addFieldValue)">Add Field</button>
  </div>
  <div>Show search results where:</div>
  <PopupEditFilter
    :filter="props.filterProfile.filter"
    @delete="emit('delete')"
    :filter-recursion-level="filterRecursionLevel"
  />
</template>

<script setup lang="ts">

import type { FilterProfile } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';
import { ref } from 'vue';
import AddMissingFields from './AddMissingFields.vue';
import { currentFilterProfileMissingFields } from '@/utils/state';

function addField(fieldName: string) {
  if (!fieldName) return;
  props.filterProfile.fieldNames.push(fieldName)
}

const props = defineProps<{ filterProfile: FilterProfile }>()
const addFieldValue = ref('')

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
