import api from './api';

export interface Account {
  balance: number;
}

export const getBalance = async (): Promise<Account> => {
  const { balance } = (await api.get<Account>('/account/balance')).data;
  return {
    balance
  };
}
