import { useState, useEffect } from "react";

interface UseQueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useQuery = <T>(queryFn: () => Promise<T>) => {
  const [state, setState] = useState<UseQueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await queryFn();
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setState({ data: null, loading: false, error: errorMessage });
      }
    };

    fetchData();
  }, [queryFn]);

  return {
    ...state,
    update: (updater: (prevData: T | null) => T | null) =>
      setState((prev) => ({ ...prev, data: updater(prev.data) })),
  };
};
