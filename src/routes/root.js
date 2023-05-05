import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
export const ThemeContext = React.createContext();

// eslint-disable-next-line
import '../style/index.scss';
import LoadingBar from 'react-top-loading-bar';
import useLocalStorage from '../hooks/useLocalStorage';
const LazyHomeContainer = React.lazy(() => import('../container/home'));
const LazyTerms = React.lazy(() => import('../container/terms'));
const LazyPrivacy = React.lazy(() => import('../container/privacy'));
const LazyTrade = React.lazy(() => import('../container/Dex/tokens'));
const LazyDashbaord = React.lazy(() => import('../container/Dashboard'));
const LazyIdo = React.lazy(() => import('../container/Launchpad/Ido'));
const LazyIdoProjects = React.lazy(() =>
    import('../container/Launchpad/IdoProjects')
);
const LazyStaking = React.lazy(() => import('../container/Launchpad/Staking'));
const LazyFarms = React.lazy(() => import('../container/Farms/farms'));
const LazySwap = React.lazy(() => import('../container/Dex/swap'));
const LazyLiquidityLayout = React.lazy(() =>
    import('../container/Dex/liquidity')
);
const LazyFaucetLayout = React.lazy(() => import('../container/Dex/faucet'));
const LazyPortfolio = React.lazy(() => import('../container/Dex/portfolio'));
const LazyAddLiquidityPage = React.lazy(() =>
    import('../components/Dex/ManageLiquidity')
);
const LazyNotFound = React.lazy(() => import('../container/NotFound/NotFound'));
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
    const FallbackUI = () => {
        return (
            <LoadingBar
                color='#5e0ee2'
                height='3px'
                shadow={true}
                progress={100}
            />
        );
    };
    return (
        <ThemeContext.Provider
            value={{ theme, handleThemeChange: handleThemeChange }}
        >
            <div className={themeclass}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyHomeContainer />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/terms'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyTerms />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/privacy'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyPrivacy />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dashboard'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyDashbaord flag={!flag} />
                                </React.Suspense>
                            }
                        />
                        <Route
                            exact
                            path='/launchpad'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyIdo flag={!flag} />
                                </React.Suspense>
                            }
                        />
                        <Route
                            exact
                            path='/launchpad/IDO/:name'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyIdoProjects flag={!flag} />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/launchpad/IDO'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyIdo flag={!flag} />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path='/launchpad/staking'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyStaking flag={!flag} />
                                </React.Suspense>
                            }
                        ></Route>
                        <Route
                            path='/farms'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyFarms flag={!flag} />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex/trade'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyTrade />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazySwap
                                        showAnalytics={showAnalytics}
                                        setShowAnalytics={setShowAnalytics}
                                    />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex/swap'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazySwap
                                        showAnalytics={showAnalytics}
                                        setShowAnalytics={setShowAnalytics}
                                    />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex/liquidity'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyLiquidityLayout />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex/faucet'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyFaucetLayout flag={!flag} />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/portfolio'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyPortfolio />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/dex/liquidity/configure-liquidity/'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyAddLiquidityPage />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='*'
                            element={
                                <React.Suspense fallback={<FallbackUI />}>
                                    <LazyNotFound />
                                </React.Suspense>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
};

export default Root;
