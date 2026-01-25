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
    const profileFilterFieldNames = selectedFilterProfile.value.fieldNames
    const websiteFieldProperties = currentWebsiteSettings.value?.fieldProperties
    if (!websiteFieldProperties) return []
    const websiteFields = Object.keys(websiteFieldProperties)
    const missingFields: string[] = []
    websiteFields.forEach(field => {
        if (!profileFilterFieldNames.includes(field)) {
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

export const filterProfileArray = computed(() => {
    return Object.entries(state.filterProfileSettings.profiles).map(([name, filterProfile]) => {
        return {
            name, filterProfile
        }
    })
})

export const websiteFilterProfile = computed(() => {
    if (!currentWebsiteSettings.value) return null
    const profileId = currentWebsiteSettings.value.selectedFilterId
    if (!profileId) return null
    const ans = state.filterProfileSettings.profiles[profileId]
    return ans
})

watch(state, () => {
    console.log('state', state)
})
