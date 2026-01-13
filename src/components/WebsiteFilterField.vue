<template>
    <div
        class="website-field-config"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseExit"
    >
        <span>{{ fieldName }}</span>
        <button
            v-if="fieldName != 'title'"
            @click="onDeleteClicked"
        >Delete</button>
    </div>
</template>

<script setup lang="ts">
import { highlightName } from '@/utils/state';

function onMouseEnter() {
    highlightName.value = props.fieldName
}

function onMouseExit() {
    highlightName.value = undefined
}

function onDeleteClicked(){
  emit('delete')
}

const props = defineProps<{
    fieldName: string
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

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
