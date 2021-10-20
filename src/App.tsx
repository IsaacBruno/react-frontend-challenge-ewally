import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

const App: FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>

      <ToastContainer />
    </ChakraProvider>
  );
};

export default App;
