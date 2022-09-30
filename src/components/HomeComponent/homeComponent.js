import React from 'react';

import Backers from './Backers/backers';
import Footer from './Footer/footer';
import Body from './LandingPage/Body/body';
import Stats from './LandingPage/Stats/stats';
import Services from './Services/services';
import TrendingNews from './TrendingNews/trendingnews';
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
