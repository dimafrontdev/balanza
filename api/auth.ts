import api from './index';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';
import { LoginFormData, RegisterFormData } from '@/schemas/auth';

export const login = async (data: LoginFormData) => {
  return api.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const register = async (data: RegisterFormData) => {
  return api.post(AUTH_ENDPOINTS.REGISTER, data);
};
