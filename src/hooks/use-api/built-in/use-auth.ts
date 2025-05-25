import type { User, AuthTokens, Error } from '../../../types/api';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';

// Register user
export const useApiRegisterMutation = (): UseApiMutateResult<
  { message: string; user: User; tokens: AuthTokens },
  {
    user: {
      name: string;
      email: string;
      password: string;
    };
    group: {
      name: string;
      defaultCurrency?: string;
    };
  },
  Error
> => {
  return useApiMutate({
    path: '/auth/register',
    method: 'POST',
  });
};

// Login user
export const useApiLoginMutation = (): UseApiMutateResult<
  { message: string; user: User; tokens: AuthTokens },
  {
    email: string;
    password: string;
  },
  Error
> => {
  return useApiMutate({
    path: '/auth/login',
    method: 'POST',
  });
};
