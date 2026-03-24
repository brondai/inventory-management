import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterDto, RegisterSchema } from '@my-app/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authApi } from '../../lib/api';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Input } from '../ui/Input';

export function RegisterForm() {
  const [error, setError] = useState<string>('');
  const form = useForm<RegisterDto>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = form.handleSubmit(async (values) => {
    setError('');
    try {
      await authApi.register(values);
      window.location.href = '/dashboard';
    } catch {
      setError('Registration failed. Try another email.');
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Input placeholder="Name" type="text" {...form.register('name')} />
      <Input placeholder="Email" type="email" {...form.register('email')} />
      <Input placeholder="Password" type="password" {...form.register('password')} />
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <Button type="submit">Register</Button>
    </Form>
  );
}
