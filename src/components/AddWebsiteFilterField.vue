<template>
    <p>Add Field</p>
    <input
        v-model="nameField"
        placeholder="Field Name"
    ></input>
    <input
        v-model="fieldValue"
        placeholder="Field Value"
        @input="console.log(3)"
    ></input>
    <button @click="addFilterField"
        @mouseenter="console.log(1)"
        @focus="console.log(2)"
    >Add</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { identifyFieldChildPath, getWindowUrl } from '@/utils/helpers';
import { state } from '@/utils/state';


function addFilterField() {
    const elementPath = identifyFieldChildPath(
        state.websiteFilterSettings[match]!.containerProperties!,
        fieldValue.value
    )
    state.websiteFilterSettings[match]!
        .fieldProperties[nameField.value] = elementPath
}

const match = getWindowUrl()


const nameField = ref('')
const fieldValue = ref('')
</script>