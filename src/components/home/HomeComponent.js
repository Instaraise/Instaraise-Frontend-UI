import React from 'react';
import Body from './LandingPage/Body/body';
// import Header from './LandingPage/Header/header';
import Stats from './LandingPage/Stats/stats';
import Services from './Services/services';
const HomeComponent = () => {
    return (
        <>
            {/* <Header /> */}
            <Body />
            <Stats />
            <Services />
        </>
    );
};

export default HomeComponent;
