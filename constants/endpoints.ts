export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const ACCOUNT_ENDPOINTS = {
  GET_ALL: '/accounts',
  GET_ONE: (id: string) => `/accounts/${id}`,
  CREATE: '/accounts',
  UPDATE: (id: string) => `/accounts/${id}`,
  DELETE: (id: string) => `/accounts/${id}`,
  GET_TOTAL: '/accounts/total',
};
