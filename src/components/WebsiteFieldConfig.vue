<template>

    <WebsiteFilterField
        v-for="fieldName in fieldNames"
        :fieldName="fieldName"
        @delete="() => onDeleteClicked(fieldName)"
        @mouseenter="highlightName = fieldName"
        @mouseleave="highlightName = undefined"
    />

</template>

<script setup lang="ts">
import type { WebsiteFilter } from '@/utils/types';
import { ref, watch } from 'vue';
import WebsiteFilterField from '@/components/WebsiteFilterField.vue'
import { highlightName } from '@/utils/state';

const props = defineProps<{
    filter: WebsiteFilter
}>()

function onDeleteClicked(fieldName: string) {
    highlightName.value = undefined
    delete props.filter.fieldProperties[fieldName]
}

const fieldNames = ref<string[]>(Object.keys(props.filter.fieldProperties))
watch(props.filter.fieldProperties, () => {
    fieldNames.value = Object.keys(props.filter.fieldProperties)
})

</script>
