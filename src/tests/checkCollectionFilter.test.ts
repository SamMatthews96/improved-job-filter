import { checkCollectionFilter } from '@/utils/filter'
import type { Filter } from '@/utils/types'
import { expect, test } from 'vitest'

test('empty collection any', () => {
    const fieldValues = {
        "title": "C#/.NET, C++"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "any",
        "subFilters": []
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(false)
})

test('empty collection all', () => {
    const fieldValues = {
        "title": "C#/.NET, C++"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": []
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})

test('include keyword c#', () => {
    const fieldValues = {
        "title": "Senior Engineer C#"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [{
            "filterType": "single",
            "fieldName": "title",
            "comparisonType": "contains keyword",
            "fieldValue": "c#"
        }]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})

test('exclude keyword c#', () => {
    const fieldValues = {
        "title": "Senior Engineer C#"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [{
            "filterType": "single",
            "fieldName": "title",
            "comparisonType": "doesn't contain keyword",
            "fieldValue": "c#"
        }]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(false)
})

test('exclude keyword c#, split by /', () => {
    const fieldValues = {
        "title": "Senior Engineer C#/C++"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [{
            "filterType": "single",
            "fieldName": "title",
            "comparisonType": "doesn't contain keyword",
            "fieldValue": "c#"
        }]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(false)
})

test('exclude keyword c#, split by /', () => {
    const fieldValues = {
        "title": "Senior Engineer C#,C++"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [{
            "filterType": "single",
            "fieldName": "title",
            "comparisonType": "doesn't contain keyword",
            "fieldValue": "c#"
        }]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(false)
})

test('doesn\'t exclude javascript, keyword Java', () => {
    const fieldValues = {
        "title": "Senior JavaScript Engineer"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [{
            "filterType": "single",
            "fieldName": "title",
            "comparisonType": "doesn't contain keyword",
            "fieldValue": "java"
        }]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})

test('include all with two matches', () => {
    const fieldValues = {
        "title": "Senior JavaScript Engineer",
        "company": "Noir"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [
            {
                "filterType": "single",
                "fieldName": "title",
                "comparisonType": "contains keyword",
                "fieldValue": "Senior"
            },
            {
                "filterType": "single",
                "fieldName": "company",
                "comparisonType": "contains keyword",
                "fieldValue": "Noir"
            },
        ]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})

test('exclude all with missing match', () => {
    const fieldValues = {
        "title": "Senior JavaScript Engineer",
        "company": "Google"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [
            {
                "filterType": "single",
                "fieldName": "title",
                "comparisonType": "contains keyword",
                "fieldValue": "Senior"
            },
            {
                "filterType": "single",
                "fieldName": "company",
                "comparisonType": "contains keyword",
                "fieldValue": "Noir"
            },
        ]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(false)
})

test('include any with one matches', () => {
    const fieldValues = {
        "title": "Senior JavaScript Engineer",
        "company": "Noir"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "any",
        "subFilters": [
            {
                "filterType": "single",
                "fieldName": "title",
                "comparisonType": "contains keyword",
                "fieldValue": "Senior"
            },
            {
                "filterType": "single",
                "fieldName": "company",
                "comparisonType": "contains keyword",
                "fieldValue": "Google"
            },
        ]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})

test('nested all match', () => {
    const fieldValues = {
        "title": "Senior JavaScript Engineer",
        "company": "Noir"
    }
    const filterProfile: Filter = {
        "filterType": "collection",
        "collectionType": "all",
        "subFilters": [
            {
                "filterType": "single",
                "fieldName": "title",
                "comparisonType": "contains keyword",
                "fieldValue": "Senior"
            },
            {
                "filterType": "collection",
                "collectionType": "all",
                "subFilters": [
                    {
                        "filterType": "single",
                        "fieldName": "title",
                        "comparisonType": "contains keyword",
                        "fieldValue": "JavaScript"
                    },
                ]
            }
        ]
    }
    const result = checkCollectionFilter(fieldValues, filterProfile)
    expect(result).toBe(true)
})