import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function getQueryClientInstance() {
  return {
    queryClient,
  };
}

export const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
