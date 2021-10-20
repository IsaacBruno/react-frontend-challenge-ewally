import { useEffect, useState, useContext } from 'react';
import { FC, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../services/auth';
import { toast } from 'react-toastify';

interface AuthContextData {
  signed: boolean;
  token: string | null;
  signIn(username: string, password: string): Promise<any>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const history = useHistory();

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

  const signIn = (username: string, password: string): Promise<any> => {
    // const response = await auth.signIn();
    // const { token } = response;
    // setToken(token);

    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // localStorage.setItem('@EwallyAuth:token', token);
    return auth.signIn(username, password).then((response: auth.Response) => {
      const { token } = response;
      setToken(token);
      localStorage.setItem('@EwallyAuth:token', token);
      toast.success('Conectado com sucesso');
      history.push('/');
    });
  };

  const signOut = (): void => {
    localStorage.removeItem('@EwallyAuth:token');
    setToken('');
    toast.success('Desconectado com sucesso');
    history.push('/login');
  };

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
