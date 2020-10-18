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
    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocalData = useCallback((getUpdatedData) => {
    mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        return { data: updatedData };
      })},
    [mergeState, url],
  );

  const updateLocalById = useCallback((id, newData) => {
    mergeState(({ data }) => {
        const updatedData = data.map((doc) => {
          if (doc._id === id) {
            return {
              ...doc,
              ...newData,
            }
          }
          return doc
        })
        return { data: updatedData };
      })},
    [mergeState, url],
  );

  return [
    {
      ...state,
      variables: { ...propsVariables, ...state.variables },
      setLocalData,
      updateLocalById,
    },
    makeRequest,
  ];
};


export default useQuery;