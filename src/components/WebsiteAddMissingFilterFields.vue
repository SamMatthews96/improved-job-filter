<template>
    <AddFieldsToFilterProfile
        :missingFilterFields="currentWebsiteMissingFields"
        @add-field="fieldName => addField(fieldName)"
    />
</template>

<script setup lang="ts">
import { currentWebsiteSettings, currentWebsiteMissingFields } from '@/utils/state';
import AddFieldsToFilterProfile from './AddFieldsToFilterProfile.vue';

function addField(fieldName: string) {
    if (fieldName == 'container' ||
        currentWebsiteSettings.value!.fieldProperties[fieldName] !== undefined
    ) {
        console.warn('duplicate')
        return
    }

    currentWebsiteSettings.value!.fieldProperties[fieldName] = null
}

</script>