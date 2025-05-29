import { createFileRoute, Outlet, useLocation, useRouter } from '@tanstack/react-router';
import { Home, Receipt, Plus, BarChart3, Settings } from 'lucide-react';

import { BottomBar } from '../components';
import { DRAWER_IDS } from '../constants/drawer-id';
import { requireAuth } from '../hooks';
import { useDrawerProvider } from '../providers/drawer/context';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: () => {
    requireAuth('/login');
  },
});

function RouteComponent() {
  const location = useLocation();
  const router = useRouter();
  const currentPath = location.pathname;
  const { openDrawer } = useDrawerProvider();

  const handleAddClick = () => {
    openDrawer(DRAWER_IDS.CREATE_TRANSACTION);
  };

  const handleNavigationClick = (href: string) => {
    void router.navigate({ to: href });
  };

  const navigationItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      isActive: currentPath === '/',
      isLink: true,
    },
    {
      href: '/transactions',
      icon: Receipt,
      label: 'Transactions',
      isActive: currentPath === '/transactions',
      isLink: true,
    },
    {
      href: '/add',
      icon: Plus,
      label: 'Add',
      isActive: false, // Never active since it's not a page
      isLink: false,
      onClick: handleAddClick,
    },
    {
      href: '/analytics',
      icon: BarChart3,
      label: 'Reports',
      isActive: currentPath === '/analytics',
      isLink: true,
    },
    {
      href: '/account',
      icon: Settings,
      label: 'Settings',
      isActive: currentPath === '/account',
      isLink: true,
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

              if (item.isLink) {
                return (
                  <div key={item.href} className="flex items-center justify-center transition-all duration-200 px-1">
                    <BottomBar.IconButton
                      variant={item.isActive ? 'coral-ghost' : 'slate-ghost'}
                      size="md"
                      icon={<IconComponent className="w-5 h-5" />}
                      tooltip={item.label}
                      onClick={() => handleNavigationClick(item.href)}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={item.href}
                  className="flex items-center justify-center transition-all duration-200 px-1 relative"
                >
                  <BottomBar.IconButton
                    variant="coral"
                    size="lg"
                    icon={<IconComponent className="w-6 h-6" />}
                    tooltip={item.label}
                    onClick={item.onClick}
                    className="shadow-lg hover:shadow-xl ring-2 ring-coral-200/50 transform hover:scale-105 transition-all duration-200"
                  />
                </div>
              );
            })}
          </div>
        </BottomBar.Content>
      </BottomBar>
    </div>
  );
}
