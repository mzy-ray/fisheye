import {AxiosResponse, AxiosError} from 'axios';

// error type to reject
export interface APIErrorData {
  status?: number;
  err?: object;
}

export const successHandler = (response: AxiosResponse): Promise<any> => {
  const {status, data} = response;

  // add success handling to extract valid data from response
  if (data.ret && data.err && data.err.ec === 0) {
    return Promise.resolve(data.ret);
  }
  // add early error handling here like 401 redirection(error code in success response)
  else if (data.err && data.err.ec !== 0) {
    return Promise.reject({
      status,
      err: data.err,
    });
  }
  return Promise.reject({
    status,
    err: {em: 'request failed with no content'},
  });
};

export const failureHandler = (error: AxiosError): Promise<APIErrorData> => {
  const {response} = error;

  if (response) {
    const {status, data} = response;

    // add early error handling here like 401 redirection(error code in failure response)
    if (status === 401) {
    }
    return Promise.reject({
      status,
      err: (data && data.err) || {em: 'request failed with no content'},
    });
  }
  return Promise.reject({
    err: {em: 'request failed with no response'},
  });
};
