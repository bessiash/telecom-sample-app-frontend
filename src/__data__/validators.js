import { find, isEmpty, toString, join } from 'lodash-es'

export const validateRequired = (value) => {
    return isEmpty(toString(value)) ? 'Required field' : undefined
}

export const getMinValueValidate = (min) => (value) => value >= min ? undefined : `Should be greater or equal than ${min}`

export const getMaxValueValidate = (max) => (value) => value <= max ? undefined : `Should be less or equal than ${max}`

export const isPhone = (value) => value && value.match(/\+7 \(\d{3}\) \d{3} \d{2} \d{2}/g) !== null

export const getPhoneValidate = (codes) => (value) => {
    if (!isPhone(value)) {
        return null
    }
    const codeMatch = `\\+7 \\(\\b(?:${join(codes, '|')})\\b\\) \\d{3} \\d{2} \\d{2}`
    var codeRgxp = new RegExp(codeMatch, 'g')
    const checkCode = value && value.match(codeRgxp)
    return checkCode !== null ? undefined : 'Invalid code for selected operator'
}

export const composeValidators = (validators) => (value) => {
    const validator = find(validators, (validator) => !!validator(value))
    return validator && validator(value)
}
