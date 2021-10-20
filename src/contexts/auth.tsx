import { useEffect, useState, useContext } from 'react';
import { FC, createContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  token: string | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    function loadStorageData() {
      const storagedToken = localStorage.getItem('@EwallyAuth:token');

      if (storagedToken) {
        setToken(storagedToken);
        // api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        // @ts-ignore
        // api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }

      // setLoading(false);
    }

    loadStorageData();
  });

  async function signIn() {
    const response = await auth.signIn();
    const { token } = response;
    setToken(token);

    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem('@EwallyAuth:token', token);
  }

  function signOut() {
    localStorage.removeItem('@EwallyAuth:token');
    setToken('');
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthContext, useAuth };
