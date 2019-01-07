import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { auth } from './auth'
import { telecom } from './telecom'
import { loader } from './loader'

export const rootReducer = (history) => combineReducers({
    auth,
    telecom,
    loader,
    router: connectRouter(history),
})
