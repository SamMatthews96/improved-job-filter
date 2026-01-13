import { reactive, watch, type Reactive, type Ref, ref } from "vue";
import Runtime from "./runtime";
import type { StoredData } from "./types";
import defaultWebsiteFieldConfig from '@/utils/defaultWebsiteFieldConfig.json'

export const state: Reactive<StoredData> = reactive({
    filterProfileSettings: {
        selectedFilterId: undefined,
        profiles: {}
    },
    websiteFilterSettings: {}
})

Runtime.get()
    .then(res => {
        if (res.websiteFilterSettings == undefined) {
            Object.assign(state.websiteFilterSettings, defaultWebsiteFieldConfig)
        }
        Object.assign(state, res)

        watch(state, (val) => {
            Runtime.set(val)
        })

        Runtime.addStorageListener((newValue) => {
            Object.assign(state, newValue)
        })
    })


export const highlightName: Ref<string | undefined> = ref(undefined)