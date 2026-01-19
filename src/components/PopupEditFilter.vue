<template>
    <div>
        <PopupEditFilterCollection
            v-if="props.filter.filterType == 'collection'"
            :filter="props.filter"
            @delete="emit('delete')"
        />
        <PopupEditSingleFilter 
            v-if="props.filter.filterType == 'single'"
            :filter="props.filter"
            @delete="emit('delete')"
        />
    </div>
</template>

<script setup lang="ts">

import type { Filter } from '@/utils/types';
import PopupEditFilterCollection from './PopupEditFilterCollection.vue';
import PopupEditSingleFilter from './PopupEditSingleFilter.vue';

const props = defineProps<{ filter: Filter }>()

console.log(props.filter)

const emit = defineEmits<{
    (e: 'delete'): void
}>()

</script>