import { assign } from 'lodash-es'

import * as actions from '../actions'

const initial = {
    operators: [],
    purce: {
        balance: null,
    },
}

export const telecom = (state = initial, action) => {
    switch (action.type) {
    case actions.TELECOM_OPERATORS_RECEIVED: {
        const { operators } = action
        return assign({}, state, { operators })
    }
    case actions.TELECOM_OPERATORS_FAILURE: {
        return initial
    }
    case actions.PURCE_RECEIVED: {
        const { purce } = action
        return assign({}, state, { purce })
    }
    case actions.PURCE_FAILURE: {
        return initial
    }
    default:
        return state
    }
}
