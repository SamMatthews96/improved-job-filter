<template>
    Website Config
    <div
        @click="console.log(props.filter.fieldProperties[fieldName])"
        v-for="fieldName in fieldNames"
    >{{ fieldName }}</div>
</template>

<script setup lang="ts">
import type { WebsiteFilter } from '@/utils/types';
import { ref, watch } from 'vue';

const props = defineProps<{
    filter: WebsiteFilter
}>()

const fieldNames = ref<string[]>(Object.keys(props.filter.fieldProperties))
watch(props.filter.fieldProperties, () => {
    fieldNames.value = Object.keys(props.filter.fieldProperties)
})

// for each element of fieldProperties, display the field name
// idea: what if mouseing over a field would highlight it


Object.entries(props.filter.fieldProperties).forEach(([key, value]) => {
    console.log(key, value)
})
</script>
