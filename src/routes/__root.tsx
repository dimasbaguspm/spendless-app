import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Breadcrumb, TopNav } from '../components';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <TopNav
        menuItems={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/about" isCurrentPage>
          About
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools buttonPosition="bottom-right" />;
    </>
  ),
});
