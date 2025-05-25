import type {
  Account,
  AccountQueryParameters,
  PaginatedResponse,
  Error,
  PagedAccounts,
  NewAccount,
  UpdateAccount,
} from '../../../types/api';
import { QUERY_KEYS } from '../constants';
import { useApiInfinite, type UseApiInfiniteResult } from '../use-api-infinite';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';
import { useApiQuery, type UseApiQueryResult } from '../use-api-query';

// List all accounts
export const useApiAccountsQuery = (params?: AccountQueryParameters): UseApiQueryResult<PaginatedResponse, Error> => {
  return useApiQuery<PaginatedResponse, AccountQueryParameters, Error>({
    queryKey: QUERY_KEYS.ACCOUNTS.list(params),
    path: '/accounts',
    queryParams: params,
  });
};

// List all accounts with infinite scroll
export const useApiAccountsInfiniteQuery = (
  params?: Omit<AccountQueryParameters, 'pageNumber'>
): UseApiInfiniteResult<PagedAccounts, Error> => {
  return useApiInfinite<PagedAccounts, AccountQueryParameters, Error>({
    queryKey: QUERY_KEYS.ACCOUNTS.infinite(params),
    path: '/accounts',
    queryParams: params,
    initialPageParam: 1,
  });
};

// Get single account
export const useApiAccountQuery = (accountId: number): UseApiQueryResult<Account, Error> => {
  return useApiQuery<Account, never, Error>({
    queryKey: QUERY_KEYS.ACCOUNTS.single(accountId),
    path: `/accounts/${accountId}`,
    enabled: !!accountId,
  });
};

// Create account
export const useApiCreateAccountMutation = (): UseApiMutateResult<Account, NewAccount, Error> => {
  return useApiMutate({
    path: '/accounts',
    method: 'POST',
  });
};

// Update account
export const useApiUpdateAccountMutation = (accountId: string): UseApiMutateResult<Account, UpdateAccount, Error> => {
  return useApiMutate({
    path: `/accounts/${accountId}`,
    method: 'PATCH',
  });
};

// Delete account
export const useApiDeleteAccountMutation = (accountId: string): UseApiMutateResult<Account, unknown, Error> => {
  return useApiMutate({
    path: `/accounts/${accountId}`,
    method: 'DELETE',
  });
};
