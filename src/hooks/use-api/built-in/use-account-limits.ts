import type {
  AccountLimit,
  AccountLimitQueryParameters,
  PaginatedResponse,
  Error,
  NewAccountLimit,
  UpdateAccountLimit,
  PagedAccountLimits,
} from '../../../types/api';
import { QUERY_KEYS } from '../constants';
import { useApiInfinite, type UseApiInfiniteResult } from '../use-api-infinite';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';
import { useApiQuery, type UseApiQueryResult } from '../use-api-query';

export const useApiListAccountLimitsQuery = (
  accountId: number,
  params?: Omit<AccountLimitQueryParameters, 'accountId'>
): UseApiQueryResult<PaginatedResponse, Error> => {
  return useApiQuery<PaginatedResponse, AccountLimitQueryParameters, Error>({
    queryKey: QUERY_KEYS.ACCOUNT_LIMITS.list(accountId, params),
    path: `/accounts/${accountId}/limits`,
    queryParams: params,
    enabled: !!accountId,
  });
};

export const useApiInfiniteAccountLimitsQuery = (
  accountId: number,
  params?: Omit<AccountLimitQueryParameters, 'accountId'>
): UseApiInfiniteResult<PagedAccountLimits, Error> => {
  return useApiInfinite<PagedAccountLimits, AccountLimitQueryParameters, Error>({
    queryKey: QUERY_KEYS.ACCOUNT_LIMITS.infinite(accountId, params),
    path: `/accounts/${accountId}/limits`,
    queryParams: params,
    initialPageParam: 1,
  });
};

export const useApiSingleAccountLimitQuery = (
  accountId: number,
  limitId: number
): UseApiQueryResult<AccountLimit, Error> => {
  return useApiQuery<AccountLimit, never, Error>({
    queryKey: QUERY_KEYS.ACCOUNT_LIMITS.single(accountId, limitId),
    path: `/accounts/${accountId}/limits/${limitId}`,
    enabled: !!accountId && !!limitId,
  });
};

export const useApiCreateSingleAccountLimitMutation = (
  accountId: string
): UseApiMutateResult<AccountLimit, NewAccountLimit, Error> => {
  return useApiMutate({
    path: `/accounts/${accountId}/limits`,
    method: 'POST',
  });
};

export const useApiUpdateSingleAccountLimitMutation = (
  accountId: string,
  accountLimitId: string
): UseApiMutateResult<AccountLimit, UpdateAccountLimit, Error> => {
  return useApiMutate({
    path: `/accounts/${accountId}/limits/${accountLimitId}`,
    method: 'PATCH',
  });
};

export const useApiDeleteSingleAccountLimitMutation = (
  accountId: string,
  accountLimitId: string
): UseApiMutateResult<AccountLimit, unknown, Error> => {
  return useApiMutate({
    path: `/accounts/${accountId}/limits/${accountLimitId}`,
    method: 'DELETE',
  });
};
