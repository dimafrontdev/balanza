import { z } from 'zod';

const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const isValidPhone = (value: string) => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
  return phoneRegex.test(value.replace(/\s/g, ''));
};

export const inviteFriendSchema = z.object({
  name: z
    .string()
    .min(1, 'groups.validation.nameRequired')
    .min(2, 'groups.validation.nameMinLength'),
  contact: z
    .string()
    .min(1, 'groups.validation.contactRequired')
    .refine(
      (value) => isValidEmail(value) || isValidPhone(value),
      'groups.validation.contactInvalid'
    ),
});

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(1, 'groups.validation.groupNameRequired')
    .min(2, 'groups.validation.groupNameMinLength'),
  icon: z.string().min(1),
});

export type InviteFriendFormData = z.infer<typeof inviteFriendSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
