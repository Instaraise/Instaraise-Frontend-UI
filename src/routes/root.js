import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import '../style/index.scss';

import HomeContainer from '../container/HOME/HomeContainer';
import Privacy from '../pages/privacy';
import Terms from '../pages/terms';
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
