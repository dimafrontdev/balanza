import { z } from 'zod';

export const accountSchema = z.object({
  type: z.string().min(1, 'accounts.errors.typeRequired'),
  accountName: z.string().min(1, 'accounts.errors.nameRequired'),
  icon: z.string().min(1),
  currency: z.object({
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
    flag: z.string(),
  }),
  currentBalance: z.string().min(1, 'accounts.errors.balanceRequired'),
  includeInTotal: z.boolean(),
});

export type AccountFormData = z.infer<typeof accountSchema>;
