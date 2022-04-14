import qs from 'qs';

export function paramsSerializer(params: object = {}): string {
  return qs.stringify(params, {
    arrayFormat: 'brackets',
  });
}

const PostLikeMethods = ['post', 'put', 'patch'];
export function isPostLike(method: string): boolean {
  return PostLikeMethods.includes(method);
}

export function isPlainObject(obj: any): boolean {
  return toString.call(obj) === '[object Object]';
}
