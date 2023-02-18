import React from 'react';

import Footer from '../../components/Home/Footer';
import Header from '../../components/Home/Header';
const NotFound = () => {
    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    return (
        <div>
            <div className='container-fluid text-dark-to-light terms_and_condition w-100 py-1 landing-page-container'>
                <div className='rounded text-dark-to-light'>
                    <Header except={true} />
                    <div id='notfound'>
                        <div className='notfound'>
                            <div className='notfound-404'>
                                <h3>Oops! Page not found</h3>
                                <h1>
                                    <span>4</span>
                                    <span>0</span>
                                    <span>4</span>
                                </h1>
                            </div>
                            <h2>
                                we are sorry, but the page you requested was not
                                found
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
