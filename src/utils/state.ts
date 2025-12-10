import { reactive, toRaw, watch, type Reactive } from "vue";
import Runtime from "./runtime";
import type { StoredData } from "./types";

export const state: Reactive<StoredData> = reactive({
    filterProfiles: {},
    websiteFilterSettings: {}
})

Runtime.get()
    .then(res => {
        Object.assign(state, res)

        watch(state, (val) => {
            console.log(toRaw(state))
            Runtime.set(val)
        })

        Runtime.addStorageListener((newValue) => {
            Object.assign(state, newValue)
        })
    })
