import api from './api';

export interface Response {
  token: string;
}

export const signIn = async (username: string, password: string): Promise<Response> => {
  const { token } = (await api.post<Response>('/user/login', { username, password })).data;
  return {
    token
  };
};
