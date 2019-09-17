import React, { SFC } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics'
import reducers from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();


const Root: SFC = ({ children }) => {
    const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));

    epicMiddleware.run(rootEpic);

    return <Provider store={store}>{children}</Provider>;
};

export default Root;