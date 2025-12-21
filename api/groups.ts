import api from './index';
import { GROUPS_ENDPOINTS } from '@/constants/endpoints';

export interface InviteFriendData {
  name: string;
  contact: string;
}

export interface CreateGroupData {
  name: string;
  icon: string;
}

export interface UpdateGroupData {
  name: string;
  icon: string;
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  icon: string;
  balance: number;
  status: 'active' | 'pending';
}

export interface GroupMember {
  id: string;
  name: string;
  balance: number;
}

export interface Group {
  id: string;
  name: string;
  icon: string;
  ownerId: string;
  balance: number;
  membersCount: number;
  members: GroupMember[];
}

export const inviteFriend = async (data: InviteFriendData) => {
  return api.post(GROUPS_ENDPOINTS.INVITE_FRIEND, data);
};

export const createGroup = async (data: CreateGroupData) => {
  return api.post(GROUPS_ENDPOINTS.CREATE, data);
};

export const updateGroup = async (groupId: string, data: UpdateGroupData) => {
  return api.put(GROUPS_ENDPOINTS.UPDATE(groupId), data);
};

export const getGroupsAndFriends = async () => {
  return api.get<{ groups: Group[]; friends: Friend[] }>(GROUPS_ENDPOINTS.GET_ALL);
};

export const acceptInvitation = async (invitationToken: string) => {
  return api.post(GROUPS_ENDPOINTS.ACCEPT_INVITATION, { invitationToken });
};

export const addMembersToGroup = async (groupId: string, memberIds: string[]) => {
  return api.post(GROUPS_ENDPOINTS.ADD_MEMBERS(groupId), { memberIds });
};

export const removeMemberFromGroup = async (groupId: string, memberId: string) => {
  return api.delete(GROUPS_ENDPOINTS.REMOVE_MEMBER(groupId, memberId));
};

export const deleteGroup = async (groupId: string) => {
  return api.delete(GROUPS_ENDPOINTS.DELETE(groupId));
};

export const removeFriend = async (friendshipId: string) => {
  return api.delete(GROUPS_ENDPOINTS.REMOVE_FRIEND(friendshipId));
};
