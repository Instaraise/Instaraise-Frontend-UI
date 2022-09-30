import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import '../style/index.scss';

import Privacy from '../components/PolicyComponent/privacy';
import Terms from '../components/PolicyComponent/terms';
import HomeContainer from '../container/HomeContainer/homeContainer';
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
