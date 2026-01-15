<template>
    <div
        :class="['website-field-config', matchStatus]"
        @mouseenter="!isEditMode && emit('highlight-on')"
        @mouseleave="emit('highlight-off')"
    >
        <span>{{ fieldName }}</span>
        <span v-if="fieldName == 'container'">
            <button
                @click="onDeleteClicked()"
                @focusout="isConfirmDelete = false"
                @mouseleave="isConfirmDelete = false"
            >
                {{ isConfirmDelete ? 'Confirm?' : 'Reset Site Data' }}
            </button>
        </span>
        <span
            v-else
            class="field-button-container"
        >
            <span
                v-if="isEditMode"
                class="edit-mode"
            >
                <input v-model="textValue">
                <span>
                    <button @click="onAccept()">Ok</button>
                    <button @click="isEditMode = false; textValue = ''">Cancel</button>
                </span>
            </span>
            <template v-else>
                <button @click="isEditMode = true; emit('highlight-off')">Edit</button>
            </template>
            <span>
                <button
                    @click="onDeleteClicked()"
                    @focusout="isConfirmDelete = false"
                    @mouseleave="isConfirmDelete = false"
                >
                    {{ isConfirmDelete ? 'Confirm?' : 'Delete' }}
                </button>
            </span>

        </span>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { state } from '@/utils/state';
import { getWindowUrl, identifyFieldChildPath } from '@/utils/helpers';
import emitter from '@/utils/emitter';
import filter from '@/utils/filter';

function onAccept() {
    const elementPath = identifyFieldChildPath(
        state.websiteFilterSettings[match]!.containerProperties!,
        textValue.value
    )
    if (!elementPath) return
    isEditMode.value = false;
    textValue.value = ''
    state.websiteFilterSettings[match]!.fieldProperties[props.fieldName] = elementPath

    matchStatus.value = checkMatchStatus()
}

function onDeleteClicked() {
    if (isConfirmDelete.value) {
        emit('delete')
    } else {
        isConfirmDelete.value = true
    }
}

function checkMatchStatus() {
    const fieldCount = filter.getFieldsByName(props.fieldName).length
    if (fieldCount) {
        return 'valid'
    } else {
        return 'invalid'
    }
}

const isEditMode = ref(false)
const isConfirmDelete = ref(false)
const textValue = ref('')
const match = getWindowUrl()
const props = defineProps<{ fieldName: string }>()
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
    border: 2px solid;
    padding: 3px;
    margin: 2px;
    display: flex;
    justify-content: space-between;
    cursor: default;
}

.valid {
    border-color: green;
}

.invalid {
    border-color: orangered;
}

input {
    width: 200px;
}

.field-button-container {
    display: flex;
}

.edit-mode {
    display: flex;
    flex-flow: column;
    align-items: center;
}
</style>
