<template>
    <p>Add Field</p>
    <input
        v-model="nameField"
        placeholder="Field Name"
    ></input>
    <input
        v-model="fieldValue"
        placeholder="Field Value"
    ></input>
    <button @click="addFilterField">Add</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { identifyFieldChildPath } from '@/utils/helpers';
import { state } from '@/utils/state';

const match = (window.location.href).match(/^https?:\/\/[^\/]+\//)![0]



function addFilterField() {
    const elementPath = identifyFieldChildPath(
        state.websiteFilterSettings[match]!.containerProperties,
        fieldValue.value
    )
    state.websiteFilterSettings[match]!
        .fieldProperties[nameField.value] = elementPath

}

const nameField = ref('')
const fieldValue = ref('')
</script>