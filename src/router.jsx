import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './__data__/store'
import * as constants from './__data__/constants'
import { pages } from './pages'
import { ProtectedRoute, Header, GlobalOverlay } from './components'

export const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Fragment>
                <Header />

                <Switch>
                    <Route exact path={constants.LOGIN_URL} component={pages.Login} />
                    <ProtectedRoute exact path={constants.REFILL_URL} component={pages.Operators} />
                    <ProtectedRoute exact path={`${constants.REFILL_URL}:id/`} component={pages.Refill} />

                    <Redirect to={constants.REFILL_URL} />
                </Switch>

                <GlobalOverlay />
            </Fragment>
        </ConnectedRouter>
    </Provider>
)
