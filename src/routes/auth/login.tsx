import { createFileRoute } from '@tanstack/react-router';

import { redirectIfAuthenticated } from '../../hooks';
import { LoginForm } from '../../modules/auth-module';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  beforeLoad: () => {
    redirectIfAuthenticated('/');
  },
});

function LoginPage() {
  return <LoginForm />;
}
