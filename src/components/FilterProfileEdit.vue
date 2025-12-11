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
        </template>
    </div>
</template>

<script setup lang="ts">

import { state } from '@/utils/state';
import type { FilterFieldList } from '@/utils/types';
import { ref, watch, type Ref } from 'vue';

const { profiles } = state.filterProfileSettings

const emit = defineEmits<{
    (e: 'delete'): void
}>()
const props = defineProps<{ selectedProfileId: string }>()
const newFieldName = ref('')
const filterFieldList: Ref<FilterFieldList> = ref(getFilterFieldList())


function addField() {
    profiles[props.selectedProfileId]![newFieldName.value] = {
        blacklistKeywords: ''
    }
}

watch(state, () => {
    filterFieldList.value = getFilterFieldList()
})

function getFilterFieldList(): FilterFieldList {
    return Object.entries(profiles[props.selectedProfileId]!)
        .map(([name, field]) => ({ name, field }))
}

</script>