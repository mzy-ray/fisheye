import axios, {AxiosRequestConfig} from 'axios';
import {paramsSerializer, isPostLike, isPlainObject} from './utils';
import {successHandler, failureHandler} from './interceptors';

const instance = axios.create({
  timeout: 5000,
  paramsSerializer,
  withCredentials: true,
  headers: {
    // Authorization: 'Basic eGluY2hlbmc6JFhpbmNoZW5nQDIwMTgh',
  },
  // onUploadProgress: function(progressEvent) {
  //   // 对原生进度事件的处理
  // }
});

instance.interceptors.response.use(successHandler, failureHandler);

type AxiosType = (params?: object, options2?: object) => Promise<any>;

export default function request(
  url: string,
  {method = 'get', dataType = 'json', ...options} = {
    method: 'get',
    dataType: 'json',
  }
): AxiosType {
  method = method.toLocaleLowerCase();

  return function ajax(params: object | undefined = {}, options2 = {}): Promise<any> {
    let axiosParams: object | string | undefined = params;
    if (
      dataType === 'formData' &&
      isPostLike(method) &&
      (isPlainObject(params) || Array.isArray(params))
    ) {
      axiosParams = paramsSerializer(axiosParams);
    }

    const configs = {
      method,
      url,
      ...(isPostLike(method) ? {data: axiosParams} : {params: axiosParams}),
      ...options,
      ...options2,
    };

    return instance.request(configs as AxiosRequestConfig);
  };
}
