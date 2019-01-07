import { call, put, all, takeLatest } from 'redux-saga/effects'

import { getAuthorizationHeadersFlow } from './auth'

import * as actions from '../actions'
import api from '../api'

export function* telecomOperatorsFlow () {
    try {
        yield put(actions.setLoaderState(true))
        const authorization = yield call(getAuthorizationHeadersFlow)
        const data = yield call(api.getTelecomOperators, authorization)
        yield put(actions.telecomOperatorsSuccess(data))
    } catch (e) {
        yield put(actions.telecomOperatorsFailure())
    } finally {
        yield put(actions.setLoaderState(false))
    }
}

export function* purceFlow () {
    try {
        const authorization = yield call(getAuthorizationHeadersFlow)
        const data = yield call(api.getPurce, authorization)
        yield put(actions.purceSuccess(data))
    } catch (e) {
        yield put(actions.purceFailure())
    }
}

export function* telecomSaga () {
    yield all([
        takeLatest(actions.TELECOM_OPERATORS_REQUEST, telecomOperatorsFlow),
        takeLatest(actions.PURCE_REQUEST, purceFlow),
    ])
}
