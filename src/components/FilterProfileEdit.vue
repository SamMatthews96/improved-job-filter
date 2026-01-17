<template>
    <div>
        <button @click="emit('delete')">Delete Profile</button>
        <div class="fields">
            <div v-for="filterField in currentFilterProfileFields">
                <label>{{ filterField.name }}</label>
                <input
                    :name="filterField.name"
                    v-model="filterField.field.blacklistKeywords"
                    :class="{
                        red: filterField.field.blacklistKeywords.match(/[,/]/)
                    }"
                ></input>
                <button @click="() => {
                    delete selectedFilterProfile![filterField.name]
                }">Delete Field</button>
            </div>
        </div>

        <AddFieldsToFilterProfile
            v-if="currentFilterProfileMissingFields.length"
            :missingFilterFields="currentFilterProfileMissingFields"
            @add-field="fieldName => addField(fieldName)"
        />
        <input
            placeholder="Field Name"
            name="new-field-name"
            v-model="newFieldName"
        ></input>
        <button @click="addField(newFieldName)">Add Field</button>
    </div>
</template>

<script setup lang="ts">

import {
    currentFilterProfileFields,
    currentFilterProfileMissingFields,
    selectedFilterProfile,
} from '@/utils/state';
import { ref } from 'vue';
import AddFieldsToFilterProfile from './AddFieldsToFilterProfile.vue';

const emit = defineEmits<{
    (e: 'delete'): void
}>()
const newFieldName = ref('')

function addField(fieldName: string) {
    selectedFilterProfile.value![fieldName] = {
        blacklistKeywords: ''
    }
}

</script>

<style lang="scss" scoped>
.red {
    color: red;
}

.fields {
    padding: 5px;
}
</style>