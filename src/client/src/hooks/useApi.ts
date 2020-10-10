import useQuery from './useQuery';
import useMutation from './useMutation';

export default {
  get: useQuery,
  // @ts-ignore
  // eslint-disable-next-line
  post: (...args) => useMutation('post', ...args),
  // @ts-ignore
  // eslint-disable-next-line
  put: (...args) => useMutation('put', ...args),
  // @ts-ignore
  // eslint-disable-next-line
  patch: (...args) => useMutation('patch', ...args),
  // @ts-ignore
  // eslint-disable-next-line
  delete: (...args) => useMutation('delete', ...args),
};