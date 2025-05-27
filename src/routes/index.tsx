import { createFileRoute, redirect } from '@tanstack/react-router';

import { TokenManager } from '../hooks/use-session/use-session';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Redirect authenticated users to home page
    if (TokenManager.hasTokens()) {
      throw redirect({
        to: '/home',
        replace: true,
      });
    }
  },
});
