import React from 'react';
import '../style/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomeContainer from '../container/HOME/HomeContainer';
import Terms from '../pages/terms';
import Privacy from '../pages/privacy';
const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeContainer />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
