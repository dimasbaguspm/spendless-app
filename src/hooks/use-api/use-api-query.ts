import {
  useQuery,
  type QueryObserverBaseResult,
  type QueryObserverResult,
  type RefetchOptions,
} from '@tanstack/react-query';
import axios from 'axios';

import { BASE_URL } from './constants';

export interface UseApiQueryOptions<Data, Query, Error> {
  queryKey: (string | number | undefined)[];
  path: string;
  queryParams?: Query;
  enabled?: boolean;
  retry?: boolean;
  silentError?: boolean;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
}

type QueryState = Pick<
  QueryObserverBaseResult,
  | 'isError'
  | 'isLoading'
  | 'isSuccess'
  | 'isFetching'
  | 'isFetched'
  | 'isFetchedAfterMount'
  | 'isRefetching'
  | 'isPlaceholderData'
  | 'isPaused'
  | 'isStale'
  | 'isInitialLoading'
  | 'isPending'
  | 'isLoadingError'
  | 'isRefetchError'
>;

export type UseApiQueryResult<TData, TError> = [
  data: TData | undefined,
  error: TError | null,
  state: QueryState,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TData, TError> | undefined>,
];

export const useApiQuery = <TData, TQuery, TError = Error>(
  options: UseApiQueryOptions<TData, TQuery, TError>
): UseApiQueryResult<TData, TError> => {
  const {
    queryKey,
    path,
    queryParams,
    enabled = true,
    retry = true,
    silentError = false,
    onSuccess,
    onError,
  } = options ?? {};

  const query = useQuery<TData, TError>({
    queryKey: queryKey.filter(Boolean),
    queryFn: async () => {
      try {
        const response = await axios.get<TData>(path, {
          params: queryParams,
          baseURL: BASE_URL,
        });

        const data = response.data;
        onSuccess?.(data);
        return data;
      } catch (error) {
        onError?.(error as TError);
        throw error;
      }
    },
    enabled,
    retry,
    meta: {
      silentError,
    },
  });

  const { data, error, refetch } = query;

  const state: QueryState = {
    isError: query.isError,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    isFetchedAfterMount: query.isFetchedAfterMount,
    isRefetching: query.isRefetching,
    isPlaceholderData: query.isPlaceholderData,
    isPaused: query.isPaused,
    isStale: query.isStale,
    isInitialLoading: query.isInitialLoading,
    isPending: query.isPending,
    isLoadingError: query.isLoadingError,
    isRefetchError: query.isRefetchError,
  };

  return [data, error, state, refetch];
};
