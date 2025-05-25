import type { User, Error, UpdateUser } from '../../../types/api';
import { QUERY_KEYS } from '../constants';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';
import { useApiQuery, type UseApiQueryResult } from '../use-api-query';

// Get current user profile
export const useApiCurrentUserQuery = (): UseApiQueryResult<{ user: User }, Error> => {
  return useApiQuery<{ user: User }, never, Error>({
    queryKey: QUERY_KEYS.USERS.current(),
    path: '/users/me',
    enabled: true,
  });
};

// Update current user profile
export const useApiUpdateCurrentUserMutation = (): UseApiMutateResult<
  { message: string; user: User },
  UpdateUser,
  Error
> => {
  return useApiMutate<{ message: string; user: User }, UpdateUser, Error>({
    path: '/users/me',
    method: 'PATCH',
  });
};
