import { createSelector } from 'reselect'
import { get } from 'lodash-es'

export const getTelecom = createSelector(
    [(slice) => slice],
    (slice) => get(slice, 'telecom')
)

export const getTelecomOperators = createSelector(
    [getTelecom],
    (telecom) => get(telecom, 'operators', [])
)

export const getPurce = createSelector(
    [getTelecom],
    (telecom) => get(telecom, 'purce', null)
)

export const getBalance = createSelector(
    [getPurce],
    (purce) => get(purce, 'balance', null)
)
