import * as actionTypes from './action-types'

export const setLoaderState = (isActive) => ({ type: actionTypes.SET_LOADER_STATE, isActive })

export const loginRequest = ({ username, password }) => ({ type: actionTypes.LOGIN_REQUEST, username, password })
export const loginSuccess = ({ access, refresh }) => ({ type: actionTypes.LOGIN_SUCCESS, access, refresh })
export const loginFailure = () => ({ type: actionTypes.LOGIN_FAILURE })

export const accessTokenRefresh = ({ access }) => ({ type: actionTypes.ACCESS_TOKEN_REFRESH, access })

export const telecomOperatorsRequest = () => ({ type: actionTypes.TELECOM_OPERATORS_REQUEST })
export const telecomOperatorsSuccess = (operators) => ({ type: actionTypes.TELECOM_OPERATORS_RECEIVED, operators })
export const telecomOperatorsFailure = () => ({ type: actionTypes.TELECOM_OPERATORS_FAILURE })

export const refillRequest = ({ id, phone, amount }) => ({
    type: actionTypes.REFILL_REQUEST, id, phone, amount: +amount,
})
export const refillSuccess = () => ({ type: actionTypes.REFILL_SUCCESS })
export const refillFailure = () => ({ type: actionTypes.REFILL_FAILURE })

export const purceRequest = () => ({ type: actionTypes.PURCE_REQUEST })
export const purceSuccess = (purce) => ({ type: actionTypes.PURCE_RECEIVED, purce })
export const purceFailure = () => ({ type: actionTypes.PURCE_FAILURE })
