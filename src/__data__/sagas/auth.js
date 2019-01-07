import { call, put, all, takeLatest, select } from 'redux-saga/effects'

import * as actions from '../actions'
import * as selectors from '../selectors'
import api from '../api'

export function* refreshAccessTokenFlow (token) {
    try {
        const data = yield call(api.refreshAccessToken, token)
        yield put(actions.accessTokenRefresh(data))
    } catch (e) {
        yield put(actions.loginFailure())
    }
}

export function* getAuthorizationHeadersFlow () {
    const isAccessTokenExpired = yield select(selectors.auth.isAccessTokenExpired)
    if (isAccessTokenExpired) {
        const refresh = yield select(selectors.auth.getRefreshToken)
        yield call(refreshAccessTokenFlow, refresh.token)
    }

    return yield select(selectors.auth.getAuthorizationHeaders)
}

export function* loginRequestFlow ({ username, password }) {
    try {
        yield put(actions.setLoaderState(true))
        const data = yield call(api.login, username, password)
        yield put(actions.loginSuccess(data))
    } catch (e) {
        yield put(actions.loginFailure())
    } finally {
        yield put(actions.setLoaderState(false))
    }
}

export function* authSaga () {
    yield all([
        takeLatest(actions.LOGIN_REQUEST, loginRequestFlow),
    ])
}
