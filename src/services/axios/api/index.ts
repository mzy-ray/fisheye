import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import qs from 'qs';

import {successHandler, failureHandler} from './interceptors';

const requestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'brackets'});
  },
  headers: {
    // Authorization: 'Basic eGluY2hlbmc6JFhpbmNoZW5nQDIwMTgh',
  },
  // onUploadProgress: function(progressEvent) {

  // }
};

const apiInstance: AxiosInstance = axios.create(requestConfig);

apiInstance.interceptors.response.use(successHandler, failureHandler);

export default apiInstance;
