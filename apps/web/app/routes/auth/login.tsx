import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '../../components/auth/LoginForm';

function LoginPage() {
  return (
    <section>
      <h1>Login</h1>
      <LoginForm />
    </section>
  );
}

export const Route = createFileRoute('/auth/login')({
  component: LoginPage
});
