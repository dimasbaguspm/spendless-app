import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '../../modules/auth-module';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
