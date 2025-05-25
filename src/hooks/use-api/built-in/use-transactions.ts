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
  return useApiMutate({
    path: '/transactions',
    method: 'POST',
  });
};

// Update transaction
export const useApiUpdateTransactionMutation = (
  transactionId: string
): UseApiMutateResult<Transaction, UpdateTransaction, Error> => {
  return useApiMutate({
    path: `/transactions/${transactionId}`,
    method: 'PATCH',
  });
};

// Delete transaction
export const useApiDeleteTransactionMutation = (
  transactionId: string
): UseApiMutateResult<Transaction, unknown, Error> => {
  return useApiMutate({
    path: `/transactions/${transactionId}`,
    method: 'DELETE',
  });
};
