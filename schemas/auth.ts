import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'auth.validation.emailRequired').email('auth.validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired')
    .min(8, 'auth.validation.passwordMinLength'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'auth.validation.nameRequired').min(2, 'auth.validation.nameMinLength'),
  email: z.string().min(1, 'auth.validation.emailRequired').email('auth.validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired')
    .min(8, 'auth.validation.passwordMinLength'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
