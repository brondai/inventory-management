import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { authApi } from '../lib/api';

function HomeRedirect() {
  useEffect(() => {
    void authApi
      .me()
      .then(() => {
        window.location.href = '/dashboard';
      })
      .catch(() => {
        window.location.href = '/auth/login';
      });
  }, []);

  return <p>Redirecting...</p>;
}

export const Route = createFileRoute('/')({
  component: HomeRedirect
});
