import { createFileRoute, Outlet } from '@tanstack/react-router';

import { TopNav } from '../components';
import { requireAuth } from '../hooks';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: () => {
    requireAuth('/login');
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <TopNav
        menuItems={[
          { label: 'Home', href: '/home' },
          { label: 'Transactions', href: '/transactions' },
          { label: 'Account', href: '/account' },
          { label: 'Analytics', href: '/analytics' },
        ]}
        avatarSrc="https://picsum.photos/32/32"
      />

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
