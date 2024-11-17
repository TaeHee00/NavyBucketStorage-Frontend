import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<LoginPage />} />
              </Routes>
          </BrowserRouter>
          <ReactQueryDevtools />
      </QueryClientProvider>
  );
}

export default App;
