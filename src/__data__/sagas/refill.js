import { call, put, all, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { getAuthorizationHeadersFlow } from './auth'

import * as actions from '../actions'
import api from '../api'

export function* refillFlow ({ id, phone, amount }) {
    try {
        yield put(actions.setLoaderState(true))
        const authorization = yield call(getAuthorizationHeadersFlow)
        yield call(api.refill, id, phone, amount, authorization)
        yield put(actions.refillSuccess())
        yield put(actions.purceRequest())
        yield put(push('/refill/'))
    } catch (e) {
        yield put(actions.refillFailure())
        yield put(actions.setLoaderState(false))
    }
}

export function* refillSaga () {
    yield all([
        takeLatest(actions.REFILL_REQUEST, refillFlow),
    ])
}
