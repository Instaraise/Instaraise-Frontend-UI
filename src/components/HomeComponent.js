import React from 'react';

import Backers from './Backers';
import Footer from './Footer';
import Body from './LandingPage/Body';
import Stats from './LandingPage/Stats';
import Services from './Services';
import TrendingNews from './TrendingNews';
const HomeComponent = () => {
    return (
        <>
            <div className='section-1'>
                <Body />
                <Stats />
            </div>
            <div className='section-2'>
                <Services />
            </div>
            <div className='section-3'>
                <Backers />
            </div>
            <div className='section-5'>
                <TrendingNews />
            </div>
            <div className='section-4'>
                <Footer />
            </div>
        </>
    );
};

export default HomeComponent;
