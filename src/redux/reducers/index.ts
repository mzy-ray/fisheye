import {combineReducers, Reducer, Action} from 'redux';

import accountReducer from './account';
import * as accountTypes from '../types/account';

export type RootState = {
  account: accountTypes.AccountState;
};

const rootReducer: Reducer = (state: RootState, action: Action) => {
  // reset redux store when logout
  if (action.type === accountTypes.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const appReducer: Reducer = combineReducers({
  account: accountReducer,
});

export default rootReducer;
