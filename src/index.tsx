import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import store, {persistor} from './store'
import App, {Loader} from './app'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install();


import './index.css';

ReactDOM.render((
    <PersistGate loading={Loader()} persistor={persistor}>
        <Provider store={store}>
            <App/>
        </Provider>
    </PersistGate>
), document.getElementById('root') as HTMLElement);
