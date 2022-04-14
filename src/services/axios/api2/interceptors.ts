type SuccessResponse = {
  status: number;
  data: {
    err: {
      ec: number;
    };
    ret: any;
  };
};

export function successHandler(response: SuccessResponse): Promise<any> {
  if (response.data.err.ec === 0) {
    return Promise.resolve(response.data.ret);
  }

  return Promise.reject({status: response.status, ...response.data.err});
}

type ErrorResponse = {
  response: {
    status?: number;
    data?: {
      err: {
        em: string;
      };
    };
  };
};

type ErrorData = {
  status: number;
  errMsg?: string;
};

export function failureHandler(error: ErrorResponse): Promise<ErrorData> {
  const {response} = error;
  const {status, data} = response || {};
  const errMsg = data && data.err && data.err.em;
  if (status === 401) {
    // window.location.href = '/admin';
    // return null;
    return Promise.reject({status: 401, errMsg});
  }
  alert(errMsg || status);
  return Promise.reject({status, errMsg, ...((data && data.err) || {})});
}
