import api from './index';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string;
  currency?: string;
}

export const getUserProfile = async () => {
  return api.get<{ user: UserProfile }>('/users/profile');
};

export const updateUserProfile = async (data: UpdateProfileData) => {
  return api.put<{ message: string; user: UserProfile }>('/users/profile', data);
};
