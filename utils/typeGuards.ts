import { Friend, Group } from '@/mocks';

export function isFriend(item: Friend | Group): item is Friend {
  return !('membersCount' in item);
}

export function isGroup(item: Friend | Group): item is Group {
  return 'membersCount' in item;
}
