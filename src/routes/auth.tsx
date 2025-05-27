import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  beforeLoad: () => {
    // If user is already authenticated, redirect to dashboard
    // You can add your auth check logic here when you have authentication context
    // For now, we'll just render the auth pages
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
