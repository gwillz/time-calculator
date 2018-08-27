
import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import local from 'redux-persist/lib/storage'
import appReducer from './appstate'

const persist = {
    key: 'loutime',
    storage: local,
}

export const store = createStore(
    persistReducer(persist, appReducer),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export const persistor = persistStore(store);

export type Store = typeof store;

export default store;
