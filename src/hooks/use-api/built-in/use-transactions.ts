import { useQueryClient } from '@tanstack/react-query';

import type {
  Transaction,
  TransactionQueryParameters,
  PaginatedResponse,
  Error,
  NewTransaction,
  UpdateTransaction,
} from '../../../types/api';
import { QUERY_KEYS } from '../constants';
import { useApiInfinite, type UseApiInfiniteResult } from '../use-api-infinite';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';
import { useApiQuery, type UseApiQueryResult } from '../use-api-query';

// List all transactions
export const useApiTransactionsQuery = (
  params?: TransactionQueryParameters
): UseApiQueryResult<PaginatedResponse, Error> => {
  return useApiQuery<PaginatedResponse, TransactionQueryParameters, Error>({
    queryKey: QUERY_KEYS.TRANSACTIONS.list(params),
    path: '/transactions',
    queryParams: params,
  });
};

// List all transactions with infinite scroll
export const useApiTransactionsInfiniteQuery = (
  params?: Omit<TransactionQueryParameters, 'pageNumber'>
): UseApiInfiniteResult<PaginatedResponse, Error> => {
  return useApiInfinite<PaginatedResponse, TransactionQueryParameters, Error>({
    queryKey: QUERY_KEYS.TRANSACTIONS.infinite(params),
    path: '/transactions',
    queryParams: params,
    initialPageParam: 1,
  });
};

// Get single transaction
export const useApiTransactionQuery = (transactionId: number): UseApiQueryResult<Transaction, Error> => {
  return useApiQuery<Transaction, never, Error>({
    queryKey: QUERY_KEYS.TRANSACTIONS.single(transactionId),
    path: `/transactions/${transactionId}`,
    enabled: !!transactionId,
  });
};

// Create transaction
export const useApiCreateTransactionMutation = (): UseApiMutateResult<Transaction, NewTransaction, Error> => {
  const queryClient = useQueryClient();

  return useApiMutate({
    path: '/transactions',
    method: 'POST',
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.all(), exact: false });
    },
  });
};

// Update transaction
export const useApiUpdateTransactionMutation = (): UseApiMutateResult<
  Transaction,
  UpdateTransaction & { transactionId: number },
  Error
> => {
  const queryClient = useQueryClient();

  return useApiMutate({
    path: `/transactions/:transactionId`,
    method: 'PATCH',
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.all(), exact: false });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TRANSACTIONS.single(variables.transactionId),
        exact: false,
      });
    },
  });
};

// Delete transaction
export const useApiDeleteTransactionMutation = (): UseApiMutateResult<
  Transaction,
  { transactionId: number },
  Error
> => {
  const queryClient = useQueryClient();

  return useApiMutate({
    path: `/transactions/:transactionId`,
    method: 'DELETE',
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.all(), exact: false });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.single(variables.transactionId), exact: false });
    },
  });
};
