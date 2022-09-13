import React from 'react';
import Body from './LandingPage/Body/body';
import Stats from './LandingPage/Stats/stats';
import Services from './Services/services';
const HomeComponent = () => {
    return (
        <div className="section-1">
            <Body />
            <Stats />
            <Services />
        </div>
    );
};

export default HomeComponent;
