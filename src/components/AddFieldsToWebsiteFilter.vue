<template>
    <!-- <div v-for="field in missingFields">{{ field }}</div> -->
    <AddFieldsToFilterProfile
        :missingFilterFields="missingFields"
        @add-field="fieldName => addField(fieldName)"
    />
</template>

<script setup lang="ts">
import { state } from '@/utils/state';
import { getWindowUrl } from '@/utils/helpers';
import { ref, watch } from 'vue';
import AddFieldsToFilterProfile from './AddFieldsToFilterProfile.vue';

function getMissingFields(): string[] {
    const { selectedFilterId, fieldProperties } = state.websiteFilterSettings[match]!
    if (!selectedFilterId) return []
    if (!state.filterProfileSettings.profiles[selectedFilterId]) {
        throw new Error('[20260114.2320]')
    }
    const profileFieldNames = Object.keys(state.filterProfileSettings.profiles[selectedFilterId])
    const filterFieldNames = Object.keys(fieldProperties)

    return profileFieldNames.filter(field =>
        !filterFieldNames.includes(field)
    )
}

function addField(fieldName: string) {
    if (fieldName == 'container' ||
        state.websiteFilterSettings[match]!.fieldProperties[fieldName] !== undefined
    ) {
        // @todo give user feedback in interface
        console.warn('duplicate')
        return
    }

    state.websiteFilterSettings[match]!
        .fieldProperties[fieldName] = null
}

const match = getWindowUrl()
const missingFields = ref(getMissingFields())
watch(state, () => {
    missingFields.value = getMissingFields()
})

</script>