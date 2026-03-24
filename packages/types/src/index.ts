import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
