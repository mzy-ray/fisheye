import {Dispatch, ActionCreator, AnyAction} from 'redux';

import * as accountTypes from '../types/account';
import * as accountModels from '../../models/account';
import * as accountServices from '../../services/account';
import {AppThunk} from '../middlewares/thunk';
import {RootState} from '../reducers';
import {APIErrorData} from '../../services/axios/api/interceptors';
import history from '../../router/history';

export function login(loginData: accountModels.LoginData): AppThunk {
  // action to add loading status
  const request: ActionCreator<AnyAction> = () => {
    return {
      type: accountTypes.LOGIN_REQUEST,
    };
  };

  // action to handle fetched data
  const success: ActionCreator<AnyAction> = (userInfo: accountModels.AccountInfo) => ({
    type: accountTypes.LOGIN_SUCCESS,
    payload: userInfo,
  });

  // action to handle request failure and error in success handler
  const failure: ActionCreator<AnyAction> = (error: APIErrorData | Error) => {
    console.log(error);
    return {
      type: accountTypes.LOGIN_FAILURE,
    };
  };

  return (dispatch: Dispatch, getState: () => RootState): void => {
    dispatch(request());
    // mock success
    // dispatch(success({username: loginData.username, role: 'tester'}));
    // history.push('/');
    accountServices
      .login(loginData)
      .then(userInfo => {
        dispatch(success(userInfo));
        history.push('/');
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
}
