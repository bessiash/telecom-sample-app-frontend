import { createSelector } from 'reselect'
import { get } from 'lodash-es'

const getLoaderlice = createSelector(
    [(slice) => slice],
    (slice) => get(slice, 'loader')
)

export const isActive = createSelector(
    [getLoaderlice],
    (loader) => get(loader, 'isActive', false)
)
