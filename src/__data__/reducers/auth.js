import jwtDecode from 'jwt-decode'
import { assign } from 'lodash-es'

import * as actions from '../actions'

const initial = {
    access: null,
    refresh: null,
}

export const auth = (state = initial, action) => {
    switch (action.type) {
    case actions.LOGIN_SUCCESS: {
        const { access, refresh } = action
        return {
            access: {
                token: access,
                ...jwtDecode(access)
            },
            refresh: {
                token: refresh,
                ...jwtDecode(refresh)
            }
        }
    }
    case actions.LOGIN_FAILURE: {
        return initial
    }
    case actions.ACCESS_TOKEN_REFRESH: {
        const { access } = action
        const delta = {
            access: {
                token: access,
                ...jwtDecode(access)
            }
        }
        return assign({}, state, delta)
    }
    default:
        return state
    }
}
