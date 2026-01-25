<template>
    <div class="collection-container">
        <label for="collection-type">Show items where </label>
        <select
            name="collection-type"
            id="collection-type"
            v-model="props.filter.collectionType"
        >
            <option v-for="collectionType in ['every', 'any']">{{ collectionType }}</option>
        </select>

        <label for="collection-type"> field matches the criteria: </label>
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
