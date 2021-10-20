import api from './api';

export interface Account {
  balance: number;
}

export interface Statement {
  balance: number;
  createdAt: string;
  description: string;
}

export const getBalance = async (): Promise<Account> => {
  const { balance } = (await api.get<Account>('/account/balance')).data;
  return {
    balance
  };
};

export const getStatements = async (initialDate: string, finalDate: string): Promise<Statement[]> => {
  const { statement } = (await api.get<any>(`/account/statements?initialDate=${initialDate}&finalDate=${finalDate}`)).data;
  const result: Statement[] = statement.map((obj: any) => ({
    balance: obj.balance,
    createdAt: obj.createdAt,
    description: obj.otherInfo.description
  }));
  return result;
};
