// sub state type
export interface AccountState {
  loggedIn: boolean;
  session?: string;
  role?: string;
  username?: string;
}

// constants for action type
export const LOGIN_REQUEST = 'ACCOUNT_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'ACCOUNT_LOGOUT_SUCCESS';
export const LOGIN_FAILURE = 'ACCOUNT_LOGIN_FAILURE';
export const LOGOUT = 'ACCOUNT_LOGOUT';
