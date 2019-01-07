import { all } from 'redux-saga/effects'

import { authSaga } from './auth'
import { telecomSaga } from './telecom'
import { refillSaga } from './refill'

export function* rootSaga () {
    yield all([
        authSaga(),
        telecomSaga(),
        refillSaga(),
    ])
}
