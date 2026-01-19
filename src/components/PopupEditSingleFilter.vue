<template>
    <input v-model="props.filter.fieldName"></input>
    <select
        name="comparison-type"
        id="comparison-type"
        v-model="props.filter.comparisonType"
    >
        <option v-for="collectionType in ['contains', '!contains', '']">{{ collectionType }}</option>
    </select>
    <input v-model="props.filter.fieldValue"></input>
    <button @click="emit('delete')">Delete</button>
</template>

<script setup lang="ts">
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
</style>