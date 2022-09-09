import React from 'react';
import Body from './LandingPage/Body/body';
// import Header from './LandingPage/Header/header';
import Stats from './LandingPage/Stats/stats';
import Services from './Services/services';

const HomeComponent = () => {
    return (
        <div className="section-1">
            {/* <Header /> */}
            <Body />
            <Stats />
            {/*
            <Services /> */}
        </div>
    );
};

export default HomeComponent;
