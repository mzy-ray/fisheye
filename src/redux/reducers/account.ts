import * as accountTypes from '../types/account';

const initialState: accountTypes.AccountState = {
  loggedIn: false,
  session: '',
  role: '',
  username: '',
};

export default function accountReducer(
  state = initialState,
  action: any
): accountTypes.AccountState {
  switch (action.type) {
    case accountTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        session: action.payload.session,
        role: action.payload.role,
        username: action.payload.username,
      };
    default:
      return state;
  }
}
