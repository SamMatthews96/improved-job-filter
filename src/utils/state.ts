import { reactive, watch, type Reactive, type Ref, ref, computed } from "vue";
import Runtime from "./runtime";
import type { ElementPath, StoredData } from "./types";
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

export const highlightContainerPath: Ref<ElementPath | undefined> = ref(undefined)

export const currentWebsiteSettings = computed(() => {
    const baseUrl = (window.location.href).match(/^https?:\/\/[^\/]+\//)![0]
    return state.websiteFilterSettings[baseUrl]
})

export const selectedFilterProfileId = computed(() => {
    return state.filterProfileSettings.selectedFilterId
})

export const selectedFilterProfile = computed(() => {
    if (!selectedFilterProfileId.value) return
    return state.filterProfileSettings.profiles[selectedFilterProfileId.value]
})

export const currentFilterProfileMissingFields = computed(() => {
    if (!selectedFilterProfile.value) return []
    const profileFilterFields = Object.keys(selectedFilterProfile.value!)
    const ans = Object.values(state.websiteFilterSettings).filter(e =>
        e.selectedFilterId == selectedFilterProfileId.value
    ).map(e => e.fieldProperties)

    const websiteFields = new Set(ans.map(e => Object.keys(e)).flat())
    const missingFields: string[] = []
    websiteFields.forEach(field => {
        if (!profileFilterFields.includes(field)) {
            missingFields.push(field)
        }
    })
    return missingFields
})

export const currentWebsiteMissingFields = computed(() => {
    const { selectedFilterId, fieldProperties } = currentWebsiteSettings.value!
    if (!selectedFilterId) return []
    if (!state.filterProfileSettings.profiles[selectedFilterId]) return []

    const profileFieldNames = Object.keys(state.filterProfileSettings.profiles[selectedFilterId])
    const filterFieldNames = Object.keys(fieldProperties)

    return profileFieldNames.filter(field =>
        !filterFieldNames.includes(field)
    )
})

export const currentFilterProfileFields = computed(() => {
    if (!selectedFilterProfileId.value) return []
    return Object.entries(state.filterProfileSettings.profiles[selectedFilterProfileId.value]!)
        .map(([name, field]) => ({ name, field }))
})

export const filterProfileArray = computed(() => {
    return Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
        return {
            name, filterProfile
        }
    })
})

export const websiteFilterProfile = computed(() => {
    if (!currentWebsiteSettings.value) return
    const profileId = currentWebsiteSettings.value.selectedFilterId
    if (!profileId) return
    const ans = state.filterProfileSettings.profiles[profileId]
    return ans
})