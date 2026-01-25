<template>
  <div class="single-filter">
    <select name="field-name" v-model="props.filter.fieldName">
      <option v-for="fieldName in selectedFilterProfile?.fieldNames">{{ fieldName }}</option>
    </select>
    <label for="reverse">Invert</label>
    <input
      type="checkbox"
      name="reverse"
      v-model="props.filter.isInverted"
    >
    <label for="reverse">Whole word only</label>
    <input
      type="checkbox"
      name="keyword-only"
      v-model="props.filter.isWholeWordOnly"
    >
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
