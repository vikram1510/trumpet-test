import { useState, useCallback } from 'react';

interface UseMutateState {
  loading: boolean;
  error: string | null;
}

export const useMutate = <TArgs, TResult>(
  mutateFn: (args: TArgs) => Promise<TResult>
) => {
  const [state, setState] = useState<UseMutateState>({
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (args: TArgs): Promise<TResult | null> => {
    setState({ loading: true, error: null });
    try {
      const result = await mutateFn(args);
      setState({ loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ loading: false, error: errorMessage });
      return null;
    }
  }, [mutateFn]);

  return {
    ...state,
    mutate,
  };
};