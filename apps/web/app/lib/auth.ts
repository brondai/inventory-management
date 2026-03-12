import { authApi } from './api';

export async function requireAuth() {
  return authApi.me();
}
