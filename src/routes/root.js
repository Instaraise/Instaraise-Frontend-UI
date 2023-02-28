import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
export const ThemeContext = React.createContext();

import '../style/index.scss';

import AddLiquidityPage from '../components/Dex/ManageLiquidity';
import Dashbaord from '../container/Dashboard';
import FaucetLayout from '../container/Dex/faucet';
import LiquidityLayout from '../container/Dex/liquidity';
import Portfolio from '../container/Dex/portfolio';
import Swap from '../container/Dex/swap';
import Trade from '../container/Dex/tokens';
import Farms from '../container/Farms/farms';
import HomeContainer from '../container/home';
import Ido from '../container/Launchpad/Ido';
import IdoProjects from '../container/Launchpad/IdoProjects';
import Staking from '../container/Launchpad/Staking';
import NotFound from '../container/NotFound/NotFound';
import Privacy from '../container/privacy';
import Terms from '../container/terms';
import useLocalStorage from '../hooks/useLocalStorage';

const getLocalData = () => {
    let selected = localStorage.getItem('selectedAnalytics');
    if (selected) {
        return JSON.parse(localStorage.getItem('selectedAnalytics'));
    } else {
        return '';
    }
};
const Root = () => {
    const [theme, setTheme] = useLocalStorage();
    const themeclass = theme ? 'light' : 'dark';
    const [flag] = React.useState(false);
    const handleThemeChange = () => {
        setTheme();
    };
    const [showAnalytics, setShowAnalytics] = React.useState(getLocalData());
    React.useEffect(() => {
        localStorage.setItem(
            'selectedAnalytics',
            JSON.stringify(showAnalytics)
        );
    }, [showAnalytics]);
    console.log(
        '%cInstaraise',
        'color: #7111e2; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
    );
    return (
        <ThemeContext.Provider
            value={{ theme, handleThemeChange: handleThemeChange }}
        >
            <div className={themeclass}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<HomeContainer />} />
                        <Route path='/terms' element={<Terms />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route
                            path='/dashboard'
                            element={<Dashbaord flag={!flag} />}
                        />
                        <Route
                            exact
                            path='/launchpad'
                            element={<Ido flag={!flag} />}
                        />
                        <Route
                            exact
                            path='/launchpad/IDO/:name'
                            element={<IdoProjects flag={!flag} />}
                        />
                        <Route
                            path='/launchpad/IDO'
                            element={<Ido flag={!flag} />}
                        />

                        <Route
                            path='/launchpad/staking'
                            element={<Staking flag={!flag} />}
                        ></Route>
                        <Route path='/farms' element={<Farms flag={!flag} />} />
                        <Route path='/dex/trade' element={<Trade />} />
                        <Route
                            path='/dex'
                            element={
                                <Swap
                                    showAnalytics={showAnalytics}
                                    setShowAnalytics={setShowAnalytics}
                                />
                            }
                        />
                        <Route
                            path='/dex/swap'
                            element={
                                <Swap
                                    showAnalytics={showAnalytics}
                                    setShowAnalytics={setShowAnalytics}
                                />
                            }
                        />
                        <Route
                            path='/dex/liquidity'
                            element={<LiquidityLayout />}
                        />
                        <Route
                            path='/dex/faucet'
                            element={<FaucetLayout flag={!flag} />}
                        />
                        <Route path='/portfolio' element={<Portfolio />} />
                        <Route
                            path='/dex/liquidity/configure-liquidity/'
                            element={<AddLiquidityPage />}
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
};

export default Root;
