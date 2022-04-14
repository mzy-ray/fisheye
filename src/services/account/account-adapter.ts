import {LoginData, AccountInfo} from '../../models/account';

export const loginAdapter = {
  toServer: (data: LoginData): LoginData => data,
  toClient: (data: any): AccountInfo => ({
    session: data.session,
    username: data.username,
    role: data.role,
  }),
};
