<template>
    <div>
        <button @click="emit('delete')">Delete Profile</button>
        <br></br>
        <input
            placeholder="Field Name"
            v-model="newFieldName"
        ></input>
        <button @click="addField">Add Field</button>
        <template v-for="filterField in filterFieldList">
            <div>{{ filterField.name }}</div>
            <input v-model="filterField.field.blacklistKeywords"></input>
            <button @click="() => {
                delete state.filterProfileSettings.profiles[props.selectedProfileId]![filterField.name]
            }">Delete Field</button>
        </template>
    </div>
</template>

<script setup lang="ts">

import { state } from '@/utils/state';
import type { FilterFieldList } from '@/utils/types';
import { ref, watch, type Ref } from 'vue';

const emit = defineEmits<{
    (e: 'delete'): void
}>()
const props = defineProps<{ selectedProfileId: string }>()
const newFieldName = ref('')
const filterFieldList: Ref<FilterFieldList> = ref(getFilterFieldList())

function addField() {
    state.filterProfileSettings.profiles[props.selectedProfileId]![newFieldName.value] = {
        blacklistKeywords: ''
    }
}

watch(state, () => {
    filterFieldList.value = getFilterFieldList()
})

function getFilterFieldList(): FilterFieldList {
    return Object.entries(state.filterProfileSettings.profiles[props.selectedProfileId]!)
        .map(([name, field]) => ({ name, field }))
}

</script>

<style lang="scss" scoped>
button,
input,
div {
    font-size: 18px;

}
</style>