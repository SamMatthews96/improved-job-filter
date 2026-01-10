import { getCommonProperties } from '@/utils/helpers'
import { expect, test } from 'vitest'

const element1 = document.createRange().createContextualFragment(`
    <div class="hello" my-attr="kevin">

    </div>
`).querySelector('div')

const element2 = document.createRange().createContextualFragment(`
    <div class="hello" my-attr="kevin">

    </div>
`).querySelector('div')

const element3 = document.createRange().createContextualFragment(`
    <div class="hello" my-attr="dave">

    </div>
`).querySelector('div')

test('same attributes and type', () => {
    const commonProps = getCommonProperties([element1!, element2!])
    expect(commonProps.elementType).toBe('div')
    expect(commonProps.attributes['my-attr']).toBe('kevin')
})

test('different attribute', () => {
    const commonProps = getCommonProperties([element1!, element3!])
    expect(commonProps.elementType).toBe('div')
    expect(commonProps.attributes['my-attr']).toBe(undefined)
})