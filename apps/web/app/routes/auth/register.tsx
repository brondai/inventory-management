import { createFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '../../components/auth/RegisterForm';

function RegisterPage() {
  return (
    <section>
      <h1>Register</h1>
      <RegisterForm />
    </section>
  );
}

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage
});
