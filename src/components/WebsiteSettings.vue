<script setup lang="ts">

import { ref } from 'vue';
import type { ElementPath } from '@/utils/types';
import {
    currentWebsiteSettings,
    state,
    filterProfileArray,
    currentWebsiteMissingFields
} from '@/utils/state'
import WebsiteSelectContainer from '@/components/WebsiteSelectContainer.vue';
import WebsiteAddFilterField from '@/components/WebsiteAddFilterField.vue';
import WebsiteFieldSettings from '@/components/WebsiteFieldSettings.vue';
import AddMissingFields from './AddMissingFields.vue';


function addWebsiteFilter(
    containerPath: ElementPath,
    titlePath: ElementPath,
    websitePrefix: string
) {
    showSelectContainer.value = false
    state.websiteFilterSettings = {
        [websitePrefix]: {
            selectedFilterId: undefined,
            containerProperties: containerPath,
            fieldProperties: {
                title: titlePath
            }
        }
    }
}

function addField(fieldName: string) {
    if (fieldName == 'container' ||
        currentWebsiteSettings.value!.fieldProperties[fieldName] !== undefined
    ) {
        console.warn('duplicate')
        return
    }

    currentWebsiteSettings.value!.fieldProperties[fieldName] = null
}

const showSelectContainer = ref(false)
const props = defineProps<{
    isShowing: boolean
}>()
const emit = defineEmits<{
    (e: "close"): void
}>()

</script>

<template>
    <div
        class="config-pane content-container"
        v-if="isShowing"
    >
        <button
            @click="emit('close')"
            class="close-button"
        >Close</button>
        <h2>Website Config Pane</h2>

        <WebsiteSelectContainer
            @foundContainer="addWebsiteFilter"
            v-if="!(currentWebsiteSettings)"
        />
        <template v-else>
            <label for="profile">Selected Profile: </label>
            <select
                name="profile"
                v-model="currentWebsiteSettings.selectedFilterId"
            >
                <option
                    v-for="filterProfile in filterProfileArray"
                    :value="filterProfile.name"
                >{{ filterProfile.name }}</option>
            </select>
            <WebsiteFieldSettings/>
            <!-- <AddMissingFields
                :missingFilterFields="currentWebsiteMissingFields"
                @add-field="fieldName => addField(fieldName)"
            /> -->
            <WebsiteAddFilterField />
        </template>

    </div>

</template>


<style scoped lang="scss">
.close-button {
    position: absolute;
    padding: 10px;
    right: 5px;
    top: 5px;
}

h2 {
    margin-top: 5px;
}

.config-pane {
    display: inline-block;
    position: fixed;
    right: 10px;
    top: 10px;
    border-radius: 10px;
    pointer-events: all;
    min-width: 400px;
}
</style>
