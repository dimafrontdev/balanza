import { z } from 'zod';

export const inviteFriendSchema = z.object({
  name: z
    .string()
    .min(1, 'groups.validation.nameRequired')
    .min(2, 'groups.validation.nameMinLength'),
  contact: z
    .string()
    .min(1, 'groups.validation.contactRequired')
    .email('groups.validation.contactInvalid'),
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
