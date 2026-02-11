<template>
  <div class="collection-container">
    <button class="delete-button" @click="emit('delete')">D</button>

    <div class="collection-settings">
      <label for="collection-type">The items where </label>
      <select name="collection-type" id="collection-type" v-model="props.filter.collectionType">
        <option v-for="collectionType in ['every', 'any', 'no']">{{ collectionType }}</option>
      </select>

      <label for="collection-type"> field matches the criteria: </label>
    </div>

    <div class="filter-list">
      <PopupEditFilter v-for="(subFilter, i) in props.filter.subFilters" :filter="subFilter"
        @delete="deleteSubFilter(i)" :filter-recursion-level="filterRecursionLevel + 1" />
    </div>
    <div class="button-container">
      <button @click="addSingleSubFilter">Add Sub-field</button>
      <button v-if="filterRecursionLevel < 3" @click="addFilterCollection">Add Sub-collection</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterCollection } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';
import { computed } from 'vue';

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

const bgHue = computed(() => {
  switch (props.filter.collectionType) {
    case 'any':
      return 180
    case 'every':
      return 270
    case 'no':
      return 0
  }
})

const backgroundColor = computed(() => {
  const bgLight = `${90 - props.filterRecursionLevel * 7}%`
  return `hsl(${bgHue.value},100%, ${bgLight})`
})

</script>

<style lang="scss" scoped>
.collection-container {
  position: relative;
  padding: 5px;
  margin: 0;
  border: solid black 2px;

  background-color: v-bind(backgroundColor);
}

.button-container {
  display: flex;
  justify-content: center;
  padding-top: 5px;
}

.collection-settings {
  padding-bottom: 5px;
}

.delete-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

<style lang="scss">
.filter-list {
  margin: 0 25px 0 25px;

  .single-filter {
    padding: 2px 2px 2px 5px;
    margin: 0;

    &:nth-child(2n) {
      background-color: #ffffff80;
    }

    &:nth-child(2n + 1) {
      background-color: #ffffff40;
    }
  }

}
</style>
