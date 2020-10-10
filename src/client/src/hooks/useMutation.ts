import { useCallback } from 'react';

import api from 'src/api';
import useMergeState from 'src/hooks/useMergeState';

const useMutation = (method, url) => {
  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isLoading: false,
  });

  const makeRequest = useCallback(
    (variables = {}) =>
      new Promise((resolve, reject) => {
        mergeState({ isLoading: true });

        api[method](url, variables).then(
          data => {
            resolve(data);
            mergeState({ data, error: null, isLoading: false });
          },
          error => {
            reject(error);
            mergeState({ error, data: null, isLoading: false });
          },
        );
      }),
    [method, url, mergeState],
  );

  return [
    {
      ...state,
    },
    makeRequest,
  ];
};

export default useMutation;