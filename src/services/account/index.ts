import axiosInstance from '../axios/api';
import {LoginData, AccountInfo} from '../../models/account';
import {loginAdapter} from './account-adapter';

export async function login(loginData: LoginData): Promise<AccountInfo> {
  try {
    const url = '/login';
    const requestData = loginAdapter.toServer(loginData);
    const response = await axiosInstance.post(url, requestData);
    const result: AccountInfo = loginAdapter.toClient(response);
    return result;
  } catch (e) {
    throw e;
  }
}
