import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDto, LoginSchema } from '@my-app/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authApi } from '../../lib/api';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Input } from '../ui/Input';

export function LoginForm() {
  const [error, setError] = useState<string>('');
  const form = useForm<LoginDto>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = form.handleSubmit(async (values) => {
    setError('');
    try {
      await authApi.login(values);
      window.location.href = '/dashboard';
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Input placeholder="Email" type="email" {...form.register('email')} />
      <Input placeholder="Password" type="password" {...form.register('password')} />
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <Button type="submit">Login</Button>
    </Form>
  );
}
