<template>
    <div class="add-field-container">
        <p>Add Field</p>
        <span>
            <input
                v-model="nameField"
                placeholder="Field Name"
            ></input>
            <button
                @click="addFilterField"
            >Add</button>
        </span>
    </div>

</template>

<script setup lang="ts">

import { ref } from 'vue';
import { getWindowUrl } from '@/utils/helpers';
import { state } from '@/utils/state';

function addFilterField() {
    if (nameField.value == 'container' ||
        state.websiteFilterSettings[match]!.fieldProperties[nameField.value] !== undefined
    ) {
        // @todo give user feedback in interface
        console.warn('duplicate')
        return
    }

    state.websiteFilterSettings[match]!
        .fieldProperties[nameField.value] = null
}

const match = getWindowUrl()

const nameField = ref('')
</script>

<style lang="scss" scoped>
.add-field-container {
    padding: 5px;
}

span {
    display: flex;
    justify-content: center;
}

p {
    text-align: center;
    margin: 4px 0 4px 0;
}
</style>