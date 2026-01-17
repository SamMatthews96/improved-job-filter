<template>
    <div
        :class="['website-field-config', matchStatus]"
        @mouseenter="highlightContainerPath =
            currentWebsiteSettings?.containerProperties"
        @mouseleave="highlightContainerPath = undefined"
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
import { getElementWithPath, getWindowUrl } from '@/utils/elementFunctions';
import { state, highlightContainerPath, currentWebsiteSettings } from '@/utils/state';

function onDeleteClicked() {
    if (isConfirmDelete.value) {
        highlightContainerPath.value = undefined
        delete state.websiteFilterSettings[getWindowUrl()]
    } else {
        isConfirmDelete.value = true
    }
}

function checkMatchStatus() {
    if (!currentWebsiteSettings.value?.containerProperties) {
        return 'invalid'
    }
    const container = getElementWithPath(currentWebsiteSettings.value.containerProperties)
    if (container) {
        return 'valid'
    } else {
        return 'invalid'
    }
}

const isConfirmDelete = ref(false)
const textValue = ref('')
const matchStatus = ref(checkMatchStatus())

watch(textValue, () => {
    emitter.emit('filter-edit-field-updated', textValue.value)
})

watch(state, () => {
    matchStatus.value = checkMatchStatus()
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

button {
    min-width: 142px;
}
</style>
