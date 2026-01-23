<template>
    <div>
        <div>Here be field list</div>
        <div v-for="fieldName in props.filterProfile.fieldNames">{{ fieldName }}</div>

    </div>
    <PopupEditFilter
        :filter="props.filterProfile.filter"
        @delete="emit('delete')"
    />
</template>

<script setup lang="ts">

import type { FilterProfile } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';

const props = defineProps<{ filterProfile: FilterProfile }>()

console.log(props.filterProfile)

const emit = defineEmits<{
    (e: 'delete'): void
}>()

</script>