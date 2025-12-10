import { reactive, watch, type Reactive } from "vue";
import Runtime from "./runtime";
import type { StoredData } from "./types";

export const state: Reactive<StoredData> = reactive({
    blacklistedJobTitles: [],
    blacklistedCompanies: [],
    websiteFilterCollection: {}
})

Runtime.get(['websiteFilterCollection'])
    .then(res => {
        Object.assign(state, res)

        watch(state, (val) => {
            Runtime.set(val)
        })

        Runtime.addStorageListener((newValue) => {
            Object.assign(state, newValue)
        })
    })
