import ky from 'ky';
import { AuthResponseSchema, LoginDto, RegisterDto } from '@my-app/types';

const client = ky.create({
  prefixUrl: 'http://localhost:3001',
  credentials: 'include'
});

export const authApi = {
  async register(payload: RegisterDto) {
    const result = await client.post('auth/register', { json: payload }).json();
    return AuthResponseSchema.parse(result);
  },
  async login(payload: LoginDto) {
    const result = await client.post('auth/login', { json: payload }).json();
    return AuthResponseSchema.parse(result);
  },
  async me() {
    const result = await client.get('auth/me').json();
    return AuthResponseSchema.parse(result);
  }
};
