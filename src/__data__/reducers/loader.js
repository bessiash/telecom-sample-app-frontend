import { assign } from 'lodash-es'

import * as actions from '../actions'

const initial = {
    isActive: false,
}

export const loader = (state = initial, action) => {
    switch (action.type) {
    case actions.SET_LOADER_STATE: {
        const { isActive } = action
        return assign({}, state, { isActive })
    }
    default:
        return state
    }
}
