import { reactive } from "vue"
import { type StoredData } from "@/utils/types"

export const state = reactive<StoredData>({
    blacklistedCompanies: [],
    blacklistedJobTitles: [],
    lastUpdated: ''
})
