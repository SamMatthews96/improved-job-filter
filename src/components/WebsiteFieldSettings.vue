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

import { ref, watch } from 'vue';
import type { WebsiteFilter } from '@/utils/types';
import WebsiteFilterField from '@/components/WebsiteFilterField.vue'
import { highlightName, state } from '@/utils/state';
import WebsiteContainer from '@/components/WebsiteContainer.vue';

const props = defineProps<{ filter: WebsiteFilter }>()

function onDeleteClicked(fieldName: string) {
    highlightName.value = undefined
    delete props.filter.fieldProperties[fieldName]
}

const fieldNames = ref<string[]>(Object.keys(props.filter.fieldProperties))
watch(state, () => {
    console.log('watch', props.filter.fieldProperties)
    fieldNames.value = Object.keys(props.filter.fieldProperties)
})

</script>
