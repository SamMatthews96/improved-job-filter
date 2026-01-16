<script setup lang="ts">

import { ref, watch, type Ref } from 'vue';
import type { ElementPath, FilterProfileList } from '@/utils/types';
import { state } from '@/utils/state'
import { getWindowUrl } from '@/utils/elementFunctions';
import ConfigPaneSelectContainer from '@/components/ConfigPaneSelectContainer.vue';
import AddWebsiteFilterField from '@/components/AddWebsiteFilterField.vue';
import WebsiteFieldConfig from '@/components/WebsiteFieldConfig.vue';
import AddFieldsToWebsiteFilter from '@/components/AddFieldsToWebsiteFilter.vue';

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

function getFilterProfileList(): FilterProfileList {
    return Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
        return {
            name, filterProfile
        }
    })
}

const showSelectContainer = ref(false)
const match = getWindowUrl()
const props = defineProps<{
    isShowing: boolean
}>()
const emit = defineEmits<{
    (e: "close"): void
}>()

const filterProfileArray: Ref<FilterProfileList> = ref(getFilterProfileList())
watch(state, () => {
    filterProfileArray.value = getFilterProfileList()
})

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

        <ConfigPaneSelectContainer
            @foundContainer="addWebsiteFilter"
            v-if="!(state.websiteFilterSettings[match])"
        />
        <template v-else>
            <label for="profile">Selected Profile: </label>
            <select
                name="profile"
                v-model="state.websiteFilterSettings[match]!.selectedFilterId"
                v-if="state.websiteFilterSettings[match]"
            >
                <option
                    v-for="filterProfile in filterProfileArray"
                    :value="filterProfile.name"
                >{{ filterProfile.name }}</option>
            </select>
            <WebsiteFieldConfig :filter="state.websiteFilterSettings[match]!" />
            <AddFieldsToWebsiteFilter />
            <AddWebsiteFilterField />
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
