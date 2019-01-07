import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as constants from '../__data__/constants'
import * as auth from '../__data__/selectors/auth'

const mapStateToProps = (state) => ({
    isAllowed: auth.isAuthenticated(state)
})

const Component = ({ isAllowed = false, ...props }) => (
    isAllowed ? <Route {...props} /> : <Redirect to={constants.LOGIN_URL} />
)

export const ProtectedRoute = connect(mapStateToProps)(Component)
