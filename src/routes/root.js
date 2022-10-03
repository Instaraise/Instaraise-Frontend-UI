import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import '../style/index.scss';

import Dashbaord from '../container/dashboard';
import HomeContainer from '../container/home';
import Privacy from '../container/privacy';
import Terms from '../container/terms';
const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeContainer />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/dashboard' element={<Dashbaord />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
