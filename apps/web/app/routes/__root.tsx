import '../styles/globals.css';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <main style={{ padding: '1rem' }}>
      <Outlet />
    </main>
  )
});
