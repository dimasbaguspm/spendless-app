import { Outlet, createFileRoute } from '@tanstack/react-router';

import { redirectIfAuthenticated } from '../hooks';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  beforeLoad: () => {
    redirectIfAuthenticated('/');
  },
});

function AuthLayout() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Outlet />
      </div>
    </div>
  );
}
