import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
export const ThemeContext = React.createContext();

import '../style/index.scss';

import AddLiquidityPage from '../components/Dex/ManageLiquidity';
import Dashbaord from '../container/Dashboard';
import LiquidityLayout from '../container/Dex/liquidity';
import Portfolio from '../container/Dex/portfolio';
import Swap from '../container/Dex/swap';
import Trade from '../container/Dex/tokens';
import Farms from '../container/Farms/farms';
import HomeContainer from '../container/home';
import Privacy from '../container/privacy';
import Terms from '../container/terms';
import useLocalStorage from '../hooks/useLocalStorage';

const Root = () => {
    const [theme, setTheme] = useLocalStorage();
    const themeclass = theme ? 'light' : 'dark';
    const [flag] = React.useState(false);
    const handleThemeChange = () => {
        setTheme();
    };
    console.log(
        '%cInstaraise',
        'color: #7111e2; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
    );
    console.log = console.warn = console.error = () => {};
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
                        <Route path='/farms' element={<Farms flag={!flag} />} />
                        <Route path='/dex/trade' element={<Trade />} />
                        <Route path='/dex/swap' element={<Swap />} />
                        <Route
                            path='/dex/liquidity'
                            element={<LiquidityLayout />}
                        />
                        <Route path='/portfolio' element={<Portfolio />} />
                        <Route
                            path='/dex/liquidity/configure-liquidity/'
                            element={<AddLiquidityPage />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
};

export default Root;
