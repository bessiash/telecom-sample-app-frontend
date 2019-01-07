import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/es/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { createFilter   } from 'redux-persist-transform-filter'
import { routerMiddleware } from 'connected-react-router'

import { rootReducer } from './reducers'
import { rootSaga } from './sagas'

export const history = createBrowserHistory()

const createAppStore = () => {
    const persistedFilter = createFilter('auth', ['access', 'refresh'])
    const reducer = persistReducer(
        {
            key: 'app',
            storage: storage,
            whitelist: ['auth'],
            transforms: [persistedFilter]
        },
        rootReducer(history))

    const sagaMiddleware = createSagaMiddleware()
    const composedEnhancer = compose(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
        devToolsEnhancer(),
    )

    const store = createStore(reducer, composedEnhancer)
    persistStore(store)
    sagaMiddleware.run(rootSaga)

    return store
}

export default createAppStore()
