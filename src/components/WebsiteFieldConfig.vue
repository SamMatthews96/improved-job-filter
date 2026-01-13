<template>
    Website Config
    <WebsiteFilterField
        v-for="fieldName in fieldNames"
        :fieldName="fieldName"
        @delete="() => onDeleteClicked(fieldName)"
    >

    </WebsiteFilterField>
</template>

<script setup lang="ts">
import type { WebsiteFilter } from '@/utils/types';
import { ref, watch } from 'vue';
import WebsiteFilterField from '@/components/WebsiteFilterField.vue'

const props = defineProps<{
    filter: WebsiteFilter
}>()

function onDeleteClicked(fieldName: string){
  delete props.filter.fieldProperties[fieldName]
}

const fieldNames = ref<string[]>(Object.keys(props.filter.fieldProperties))
watch(props.filter.fieldProperties, () => {
    fieldNames.value = Object.keys(props.filter.fieldProperties)
})

</script>
