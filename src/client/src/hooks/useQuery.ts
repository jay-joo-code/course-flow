import { useCallback, useEffect } from 'react';

import api from 'src/api';
import useMergeState from 'src/hooks/useMergeState';

const useQuery = (url, propsVariables = {}) => {
  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isLoading: false,
  });

  const makeRequest = useCallback(() => {
      mergeState({ isLoading: true });
      console.log('make request')
      api.get(url).then(
        data => {
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    console.log('useEffect')
    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocalData = useCallback((getUpdatedData) => {
    console.log('setLocalData')
    mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        return { data: updatedData };
      })},
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