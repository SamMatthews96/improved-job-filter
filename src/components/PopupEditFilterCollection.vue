<template>
  <div class="collection-container">
    <label for="collection-type">The items where </label>
    <select name="collection-type" id="collection-type" v-model="props.filter.collectionType">
      <option v-for="collectionType in ['every', 'any']">{{ collectionType }}</option>
    </select>

    <label for="collection-type"> field matches the criteria: </label>
    <button @click="emit('delete')">Delete</button>
    <span class="filter-list">
      <PopupEditFilter v-for="(subFilter, i) in props.filter.subFilters" :filter="subFilter"
        @delete="deleteSubFilter(i)" :filter-recursion-level="filterRecursionLevel + 1" />
    </span>
    <div>
      <button @click="addSingleSubFilter">Add Sub-field</button>
      <button @click="addFilterCollection">Add Sub-collection</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterCollection } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';
import { ref } from 'vue';

function addSingleSubFilter() {
  props.filter.subFilters.push({
    filterType: 'single',
    fieldName: 'test',
    fieldValue: '',
    isInverted: false,
    isWholeWordOnly: false
  })
}

function addFilterCollection() {
  props.filter.subFilters.push({
    filterType: 'collection',
    collectionType: 'every',
    subFilters: []
  })
}

function deleteSubFilter(index: number) {
  props.filter.subFilters = props.filter.subFilters.filter((e, i) => {
    return i != index
  })
}

const props = defineProps<{
  filter: FilterCollection,
  filterRecursionLevel: number
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

function calculateBackgroundColor() {
  const c = 0.1
  const l = Math.max(0, 1 - c * props.filterRecursionLevel)
  const r = 200 * l
  const g = 200 * l
  const b = 250 * l
  return (`rgba(${r},${g},${b},1)`)
}

const backgroundColor = calculateBackgroundColor()

</script>

<style lang="scss" scoped>

.collection-container {
  padding: 0px 0 0 5px;
  margin: 0px 5px 0 5px;
  background-color: v-bind(backgroundColor);
}
</style>

<style lang="scss">
.filter-list {
  &>div:nth-child(2n)>.single-filter {
    background-color: #ffffff80;
  }

  &>div:nth-child(2n + 1)>.single-filter {
    background-color: #ffffff40;
  }
}

</style>
