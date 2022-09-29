import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import '../style/index.scss';

import HomeContainer from '../container/HOME';
import Privacy from '../container/PRIVACY';
import Terms from '../container/TERMS';
const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeContainer />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/privacy' element={<Privacy />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
