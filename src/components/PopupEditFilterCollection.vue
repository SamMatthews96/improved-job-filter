<template>
    <div class="collection-container">
        <label for="collection-type">Check for</label>
        <select
            name="collection-type"
            id="collection-type"
            v-model="props.filter.collectionType"
        >
            <option v-for="collectionType in ['all', 'any']">{{ collectionType }}</option>
        </select>
        <button @click="emit('delete')">Delete</button>
        <PopupEditFilter
            v-for="(subFilter, i) in props.filter.subFilters"
            :filter="subFilter"
            @delete="deleteSubFilter(i)"
        />
        <div>
            <button @click="addSingleSubFilter">Add Sub-field</button>
            <button @click="addFilterCollection">Add Sub-collection</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FilterCollection } from '@/utils/types';
import PopupEditFilter from './PopupEditFilter.vue';

function addSingleSubFilter() {
    props.filter.subFilters.push({
        filterType: 'single',
        fieldName: 'test',
        comparisonType: '',
        fieldValue: ''
    })
}

function addFilterCollection() {
    props.filter.subFilters.push({
        filterType: 'collection',
        collectionType: 'all',
        subFilters: []
    })
}

function deleteSubFilter(index: number) {
    props.filter.subFilters = props.filter.subFilters.filter((e, i) => {
        return i != index
    })
}

const props = defineProps<{ filter: FilterCollection }>()

const emit = defineEmits<{
    (e: 'delete'): void
}>()

</script>

<style lang="scss" scoped>
.red {
    color: red;
}

.fields {
    padding: 5px;
}

.collection-container {
    border: 1px white solid;
    padding: 3px;
    border-radius: 5px;
    margin: 3px;
}
</style>