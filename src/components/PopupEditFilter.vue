<template>
    <div>
        <PopupEditFilterCollection
            v-if="props.filter.filterType == 'collection'"
            :filter="props.filter"
            @delete="emit('delete')"
            :filter-recursion-level="filterRecursionLevel + 1"
        />
        <PopupEditSingleFilter
            v-if="props.filter.filterType == 'single'"
            :filter="props.filter"
            @delete="emit('delete')"
            :filter-recursion-level="filterRecursionLevel + 1"
        />
    </div>
</template>

<script setup lang="ts">

import type { Filter } from '@/utils/types';
import PopupEditFilterCollection from './PopupEditFilterCollection.vue';
import PopupEditSingleFilter from './PopupEditSingleFilter.vue';

const props = defineProps<{
  filter: Filter,
  filterRecursionLevel: number
}>()

console.log(props.filter)

const emit = defineEmits<{
    (e: 'delete'): void
}>()

</script>
