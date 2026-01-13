<template>
    Website Config
    <div
        v-for="fieldName in fieldNames"
        class="website-field-config"
        @mouseenter="() => onMouseEnter(fieldName)"
        @mouseleave="() => onMouseExit(fieldName)"
    >
        <span>{{ fieldName }}</span>
        <button
            v-if="fieldName != 'title'"
            @click="() => {
                delete props.filter.fieldProperties[fieldName]
            }"
        >Delete</button>
    </div>
</template>

<script setup lang="ts">
import type { WebsiteFilter } from '@/utils/types';
import { ref, watch } from 'vue';

function onMouseEnter(fieldName: string){
    console.log(fieldName)
}

function onMouseExit(fieldName: string){
    
}

const props = defineProps<{
    filter: WebsiteFilter
}>()

const fieldNames = ref<string[]>(Object.keys(props.filter.fieldProperties))
watch(props.filter.fieldProperties, () => {
    fieldNames.value = Object.keys(props.filter.fieldProperties)
})

</script>

<style scoped lang="scss">
.website-field-config {
    border: 1px red solid;
    padding: 3px;
    margin: 2px;
    display: flex;
    justify-content: space-between;
    cursor: default;
}
</style>
