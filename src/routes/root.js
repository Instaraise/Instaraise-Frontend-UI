import React from 'react';
import '../style/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomeContainer from '../container/HOME/HomeContainer';
const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeContainer />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
