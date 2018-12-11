import './css/vendor/bootstrap.min.css';
import './css/vendor/bootstrap-theme.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from "react-localize-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/config/store';
import App from './App';
import { Spinner } from './components/main/spinner'
import * as serviceWorker from './serviceWorker';

const { persistor, store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor}>
                <App />
            </PersistGate>
        </LocalizeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
