import { useCallback, useEffect } from 'react';

import api from 'src/api';
import useMergeState from 'src/hooks/useMergeState';

const useQuery = (url, propsVariables = {}) => {
  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isLoading: false,
    variables: {},
  });

  const makeRequest = useCallback(() => {
      const variables = { ...state.variables };
      const apiVariables = { ...propsVariables, ...variables };

      mergeState({ isLoading: true, variables });

      api.get(url, apiVariables).then(
        data => {
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [propsVariables],
  );

  useEffect(() => {
    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeRequest]);

  const setLocalData = useCallback((getUpdatedData) =>
      mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        return { data: updatedData };
      }),
    [mergeState, url],
  );

  return [
    {
      ...state,
      variables: { ...propsVariables, ...state.variables },
      setLocalData,
    },
    makeRequest,
  ];
};


export default useQuery;