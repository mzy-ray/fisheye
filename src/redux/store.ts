import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers';

const middleware: Array<Middleware> = [thunk];

const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
