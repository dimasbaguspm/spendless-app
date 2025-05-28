import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import { Home, Receipt, Plus, BarChart3, Settings } from 'lucide-react';

import { BottomBar } from '../components';
import { requireAuth } from '../hooks';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: () => {
    requireAuth('/login');
  },
});

function RouteComponent() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      isActive: currentPath === '/',
    },
    {
      href: '/transactions',
      icon: Receipt,
      label: 'Transactions',
      isActive: currentPath === '/transactions',
    },
    {
      href: '/add',
      icon: Plus,
      label: 'Add',
      isActive: currentPath === '/add',
    },
    {
      href: '/analytics',
      icon: BarChart3,
      label: 'Reports',
      isActive: currentPath === '/analytics',
    },
    {
      href: '/account',
      icon: Settings,
      label: 'Settings',
      isActive: currentPath === '/account',
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>

      <BottomBar variant="compact">
        <BottomBar.Content>
          <div className="flex items-center justify-around w-full max-w-md mx-auto px-3 py-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center justify-center transition-all duration-200 px-1"
                >
                  <BottomBar.IconButton
                    variant={item.isActive ? 'coral' : 'slate-ghost'}
                    size="md"
                    icon={<IconComponent className="w-5 h-5" />}
                    tooltip={item.label}
                  />
                </Link>
              );
            })}
          </div>
        </BottomBar.Content>
      </BottomBar>
    </div>
  );
}
