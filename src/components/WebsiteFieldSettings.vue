<template>
    <WebsiteContainer />
    <WebsiteFilterField
        v-for="fieldName in fieldNames"
        :fieldName="fieldName"
        @delete="() => onDeleteClicked(fieldName)"
        @highlight-on="highlightName = fieldName"
        @highlight-off="highlightName = undefined"
    />
</template>

<script setup lang="ts">

import { computed } from 'vue';
import WebsiteFilterField from '@/components/WebsiteFilterField.vue'
import { currentWebsiteSettings, highlightName } from '@/utils/state';
import WebsiteContainer from '@/components/WebsiteContainer.vue';

function onDeleteClicked(fieldName: string) {
    highlightName.value = undefined
    if (!currentWebsiteSettings.value) return
    delete currentWebsiteSettings.value.fieldProperties[fieldName]
}

const fieldNames = computed(() => {
    if (!currentWebsiteSettings.value) return []
    return Object.keys(currentWebsiteSettings.value.fieldProperties)
})


</script>
