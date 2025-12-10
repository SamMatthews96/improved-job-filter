<template>
    Website Config
    <div
        v-for="fieldName in fieldNames"
        class="website-field-config"
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

<style scoped lang="scss">
.website-field-config {
    border: 1px red solid;
    text-align: center;
    cursor: default;
}
</style>
