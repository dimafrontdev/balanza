import axiosInstance from './index';

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

export const groupsApi = {
  inviteFriend: async (data: InviteFriendData) => {
    const response = await axiosInstance.post('/groups/friends/invite', data);
    return response.data;
  },

  createGroup: async (data: CreateGroupData) => {
    const response = await axiosInstance.post('/groups', data);
    return response.data;
  },

  updateGroup: async (groupId: string, data: UpdateGroupData) => {
    const response = await axiosInstance.put(`/groups/${groupId}`, data);
    return response.data;
  },

  getGroupsAndFriends: async (): Promise<{ groups: Group[]; friends: Friend[] }> => {
    const response = await axiosInstance.get('/groups');
    return response.data;
  },

  acceptInvitation: async (invitationToken: string) => {
    const response = await axiosInstance.post('/groups/invitations/accept', {
      invitationToken,
    });
    return response.data;
  },

  addMembersToGroup: async (groupId: string, memberIds: string[]) => {
    const response = await axiosInstance.post(`/groups/${groupId}/members`, {
      memberIds,
    });
    return response.data.group;
  },

  removeMemberFromGroup: async (groupId: string, memberId: string) => {
    const response = await axiosInstance.delete(`/groups/${groupId}/members/${memberId}`);
    return response.data.group;
  },

  deleteGroup: async (groupId: string) => {
    const response = await axiosInstance.delete(`/groups/${groupId}`);
    return response.data;
  },

  removeFriend: async (friendshipId: string) => {
    const response = await axiosInstance.delete(`/groups/friends/${friendshipId}`);
    return response.data;
  },
};
