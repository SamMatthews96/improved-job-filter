import { reactive } from "vue"

export interface StoredData {
    blacklistedJobTitles: string[];
    blacklistedCompanies: string[];
}

export const state = reactive<StoredData>({
    blacklistedCompanies: [],
    blacklistedJobTitles: []
})
