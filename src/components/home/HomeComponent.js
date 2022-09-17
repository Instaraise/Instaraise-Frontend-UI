import React from 'react';
import Body from './LandingPage/Body/body';
import Stats from './LandingPage/Stats/stats';
import Services from './Services/services';
import Backers from './Backers/backers';
import Backerstwo from './Backers2/backerstwo';
import EcoSystem from './EcoSystem/ecosystem';
import RoadMap from './Roadmap/roadmap';
import TrendingNews from './TrendingNews/trendingnews';
import Footer from './Footer/footer';
const HomeComponent = () => {
    return (
        <>
            <div className="section-1">
                <Body />
                <Stats />
            </div>
            <div className="section-2">
                <Services />
            </div>
            <div>
                <Backers />
            </div>
            <div>
                <Backerstwo />
            </div>
            <div className="section-3">
                <EcoSystem />
            </div>
            <div>
                <TrendingNews />
            </div>
            {/* <div className="section-5">
                <RoadMap />
            </div> */}
            <div className="section-4">
                <Footer />
            </div>
        </>
    );
};

export default HomeComponent;
