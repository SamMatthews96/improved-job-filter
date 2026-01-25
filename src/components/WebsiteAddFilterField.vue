<template>
    <div class="add-field-container">
        <p>Add Field</p>
        <span>
            <input
                v-model="nameField"
                placeholder="Field Name"
            ></input>
            <button @click="addFilterField"
              :disabled="isButtonDisabled"
            >Add</button>
        </span>
    </div>

</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import { currentWebsiteFilterNames, currentWebsiteSettings } from '@/utils/state';

function addFilterField() {
    if (currentWebsiteSettings.value!.fieldProperties[nameField.value] !== undefined) {
        // @todo give user feedback in interface
        console.warn('duplicate')
        return
    }

    currentWebsiteSettings.value!.fieldProperties[nameField.value] = null
}

const nameField = ref('')
const isButtonDisabled = computed(() => {
  return currentWebsiteFilterNames.value.includes(nameField.value)
})
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
