import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from 'components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
