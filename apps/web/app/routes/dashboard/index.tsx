import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { authApi } from '../../lib/api';

type User = {
  id: string;
  name: string;
  email: string;
};

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void authApi
      .me()
      .then((response) => {
        setUser(response.user);
      })
      .catch(() => {
        window.location.href = '/auth/login';
      });
  }, []);

  if (!user) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>{user.email}</p>
    </section>
  );
}

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage
});
