<template>
  <div class="single-filter">
    <select name="field-name" v-model="props.filter.fieldName">
      <option v-for="fieldName in selectedFilterProfile?.fieldNames">{{ fieldName }}</option>
    </select>

    <select name="comparison-type" id="comparison-type" v-model="props.filter.comparisonType">
      <option v-for="collectionType in [
        'contains keyword',
        'doesn\'t contain keyword',
        'contains string',
        'doesn\'t contain string',
        ''
      ]">{{ collectionType }}</option>
    </select>
    <input v-model="props.filter.fieldValue"></input>
    <button @click="emit('delete')">Delete</button>
  </div>

</template>

<script setup lang="ts">
import { selectedFilterProfile } from '@/utils/state';
import type { SingleFilter } from '@/utils/types';

const props = defineProps<{ filter: SingleFilter }>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

</script>

<style lang="scss" scoped>
input {
  min-width: 10px;
  max-width: 20%;
}

.single-filter {
  margin: 4px;
  padding: 5px;
  border-top: solid 1px white;
}
</style>
