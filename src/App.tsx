import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

const App: FC = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
