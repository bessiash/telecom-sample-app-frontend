import { createSelector } from 'reselect'
import { get } from 'lodash-es'

const getAuthSlice = createSelector(
    [(slice) => slice],
    (slice) => get(slice, 'auth')
)

export const getAccessToken = createSelector(
    [getAuthSlice],
    (auth) => get(auth, 'access')
)

export const getRefreshToken = createSelector(
    [getAuthSlice],
    (auth) => get(auth, 'refresh')
)

const isExparedToken = (token) => {
    return 1000 * get(token, 'exp', 0) < (new Date()).getTime()
}

export const isAccessTokenExpired = (state) => {
    const token = getAccessToken(state)
    return isExparedToken(token)
}

export const isRefreshTokenExpired = (state) => {
    const token = getRefreshToken(state)
    return isExparedToken(token)
}

export const isAuthenticated = (state) => !isRefreshTokenExpired(state)

export const getAuthorizationHeaders = createSelector(
    [getAccessToken],
    (token) => ({
        Authorization: `Bearer ${token.token}`
    })
)
