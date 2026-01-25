<template>
  <div class="single-filter">
    <span>The </span>
    <select name="field-name" v-model="props.filter.fieldName">
      <option v-for="fieldName in selectedFilterProfile?.fieldNames">{{ fieldName }}</option>
    </select>
    <span> field </span>
    <input type="checkbox" name="reverse" v-model="props.filter.isInverted">
    <span> {{ props.filter.isInverted ? 'doesn\'t contain: ' : 'contains: ' }} </span>

    <input v-model="props.filter.fieldValue"></input><br>
    <label for="reverse">Whole word only</label>
    <input type="checkbox" name="keyword-only" v-model="props.filter.isWholeWordOnly">

    <button @click="emit('delete')">Delete</button>
  </div>

</template>

<script setup lang="ts">
import { selectedFilterProfile } from '@/utils/state';
import type { SingleFilter } from '@/utils/types';

const props = defineProps<{
  filter: SingleFilter,
  filterRecursionLevel: number
}>()

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
}
</style>

