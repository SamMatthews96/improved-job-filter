<template>
    <div>
        <button @click="emit('delete')">Delete Profile</button>
        <div class="fields">
            <div v-for="filterField in filterFieldList">
                <label>{{ filterField.name }}</label>
                <input
                    :name="filterField.name"
                    v-model="filterField.field.blacklistKeywords"
                    :class="{
                        red: filterField.field.blacklistKeywords.match(/[,/]/)
                    }"
                ></input>
                <button @click="() => {
                    delete state.filterProfileSettings.profiles[props.selectedProfileId]![filterField.name]
                }">Delete Field</button>
            </div>
        </div>

        <AddFieldsToFilterProfile
            v-if="missingFilterFields.length"
            :missingFilterFields="missingFilterFields"
            @add-field="fieldName => addField(fieldName)"
        />
        <input
            placeholder="Field Name"
            name="new-field-name"
            v-model="newFieldName"
        ></input>
        <button @click="addField(newFieldName)">Add Field</button>
    </div>
</template>

<script setup lang="ts">

import { state } from '@/utils/state';
import type { FilterFieldList } from '@/utils/types';
import { ref, watch, type Ref } from 'vue';
import AddFieldsToFilterProfile from './AddFieldsToFilterProfile.vue';

const emit = defineEmits<{
    (e: 'delete'): void
}>()
const props = defineProps<{ selectedProfileId: string }>()
const newFieldName = ref('')
const filterFieldList: Ref<FilterFieldList> = ref(getFilterFieldList())

const missingFilterFields: Ref<string[]> = ref(getMissingFilterFields())

function addField(fieldName: string) {
    state.filterProfileSettings.profiles[props.selectedProfileId]![fieldName] = {
        blacklistKeywords: ''
    }
}

watch(state, () => {
    filterFieldList.value = getFilterFieldList()
    missingFilterFields.value = getMissingFilterFields()
})

function getMissingFilterFields(): string[] {
    const profileFilterFields = Object.keys(state.filterProfileSettings.profiles[props.selectedProfileId]!)
    const ans = Object.values(state.websiteFilterSettings).filter(e =>
        e.selectedFilterId == state.filterProfileSettings.selectedFilterId
    ).map(e => e.fieldProperties)
    const websiteFields = new Set(ans.map(e => Object.keys(e)).flat())
    const missingFields: string[] = []
    websiteFields.forEach(field => {
        if (!profileFilterFields.includes(field)) {
            missingFields.push(field)
        }
    })
    return missingFields
}

function getFilterFieldList(): FilterFieldList {
    return Object.entries(state.filterProfileSettings.profiles[props.selectedProfileId]!)
        .map(([name, field]) => ({ name, field }))
}

</script>

<style lang="scss" scoped>
.red {
    color: red;
}

.fields {
    padding: 5px;
}
</style>