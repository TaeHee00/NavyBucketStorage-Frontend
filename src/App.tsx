import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {CookiesProvider} from "react-cookie";
import RegisterPage from "./pages/RegisterPage";
import RegisterInfoPage from "./pages/RegisterInfoPage";
import NbsPage from "./pages/NbsPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NbsBucketCreatePage from "./pages/NbsBucketCreatePage";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='/register/step/1' element={<RegisterInfoPage/>}/>
                        <Route path='/nbs' element={<NbsPage/>}/>
                        <Route path='/nbs/bucket/create' element={<NbsBucketCreatePage/>}/>
                    </Routes>
                    <ToastContainer position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    closeOnClick
                                    pauseOnHover/>
                </BrowserRouter>
                <ReactQueryDevtools/>
            </CookiesProvider>
        </QueryClientProvider>
    );
}

export default App;
