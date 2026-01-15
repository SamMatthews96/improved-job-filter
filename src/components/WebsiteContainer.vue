<template>
    <div
        :class="['website-field-config', matchStatus]"
        @mouseenter="!isEditMode && emit('highlight-on')"
        @mouseleave="emit('highlight-off')"
    >
        <span>Container</span>
        <span>
            <button
                @click="onDeleteClicked()"
                @focusout="isConfirmDelete = false"
                @mouseleave="isConfirmDelete = false"
            >
                {{ isConfirmDelete ? 'Confirm?' : 'Reset Site Data' }}
            </button>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import emitter from '@/utils/emitter';
import { getElementWithPath, getWindowUrl } from '@/utils/helpers';
import { state } from '@/utils/state';

function onDeleteClicked() {
    if (isConfirmDelete.value) {
        emit('delete')
    } else {
        isConfirmDelete.value = true
    }
}

function checkMatchStatus() {
    const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
    if (!websiteFilter?.containerProperties) throw new Error('[20260115.0153]')
    const container = getElementWithPath(websiteFilter.containerProperties)
    console.log(websiteFilter.containerProperties)
    if (container) {
        return 'valid'
    } else {
        return 'invalid'
    }
}

const isEditMode = ref(false)
const isConfirmDelete = ref(false)
const textValue = ref('')
const emit = defineEmits<{
    (e: 'delete'): void,
    (e: 'highlight-on'): void,
    (e: 'highlight-off'): void,
}>()
const matchStatus = ref(checkMatchStatus())

watch(textValue, () => {
    emitter.emit('filter-edit-field-updated', textValue.value)
})

</script>

<style scoped lang="scss">
.website-field-config {
    border: 4px solid;
    padding: 3px;
    margin: 2px;
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    cursor: default;
}

.valid {
    border-color: green;
}

.invalid {
    border-color: orangered;
}

.field-button-container {
    display: flex;
}
</style>
