import rootReducer from '../reducers/index.reducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(rootReducer);
const loggerMiddleware = createLogger();

let middleware = [];

if (process.env.NODE_ENV !== 'production') {
    let logger = loggerMiddleware;
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
