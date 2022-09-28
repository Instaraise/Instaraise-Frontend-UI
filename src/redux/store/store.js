import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index.reducer';

let middleware = [];

if (process.env.NODE_ENV !== 'production') {
    let thunk = thunkMiddleware;
    middleware = [...middleware, thunk];
} else {
    let thunk = thunkMiddleware;
    middleware = [...middleware, thunk];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = function (initialState) {
    if (initialState === void 0) {
        initialState = {};
    }
    return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;
