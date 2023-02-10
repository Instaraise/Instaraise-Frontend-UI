import axios from 'axios';

import { API, NETWORK, RPC_NODES } from '../../../config/config';
import { FARMS_CONFIG } from '../../../config/FarmsConfig/farms.config';

const fetchStorageOfStakingContract = async (
    identifier,
    address,
    DECIMAL,
    priceOfStakeTokenInUsd,
    priceOfInstaInUSD
) => {
    try {
        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];

        const url = `${rpcNode}/chains/main/blocks/head/context/contracts/${address}/storage`;
        const response = await axios.get(url);

        // totalStaked = totalSupply
        let totalSupply = response.data.args[0].args[2].args[3].int;

        totalSupply = (totalSupply / Math.pow(10, 6)).toFixed(2);
        totalSupply = parseFloat(totalSupply);

        // rewardPerBlock = rewardRate
        let rewardRate = response.data.args[0].args[2].args[0].args[1].int;

        rewardRate = (rewardRate / Math.pow(10, DECIMAL)).toFixed(9);
        rewardRate = parseFloat(rewardRate);
        let APR =
            (rewardRate * 1051200 * priceOfInstaInUSD) /
            (totalSupply * priceOfStakeTokenInUsd);

        APR = (APR * 100).PrecisionMaker(2);
        let totalLiquidty = (
            totalSupply * priceOfStakeTokenInUsd
        ).PrecisionMaker(2);

        return {
            success: true,
            identifier,
            APR,
            totalLiquidty,
            totalSupply,
            address,
            rewardRate,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};
const getLpPriceFromDex = async (identifier, dexAddress) => {
    try {
        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];

        const response = await axios.get(
            `${rpcNode}/chains/main/blocks/head/context/contracts/${dexAddress}/storage`
        );

        let tez_pool = parseInt(
            response.data.args[1].args[0].args[1].args[2].int
        );
        let total_Supply = parseInt(
            response.data.args[1].args[1].args[0].args[0].int
        );
        let lpPriceInXtz = (tez_pool * 2) / total_Supply;

        return {
            success: true,
            identifier,
            lpPriceInXtz,
            tez_pool,
            total_Supply,
            dexAddress,
        };
    } catch (error) {
        return {
            success: false,
            identifier,
            lpPriceInXtz: 0,
        };
    }
};
export const getFarmsDataAPI = async () => {
    try {
        let promises = [];
        let dexPromises = [];
        let initialDataPromises = [];
        initialDataPromises.push(axios.get(API.url));
        initialDataPromises.push(axios.get(API.tezToolTokenPrice));
        const initialDataResponse = await Promise.all(initialDataPromises);
        const xtzPriceResponse = initialDataResponse[0];
        const xtzPriceInUsd =
            xtzPriceResponse.data.market_data.current_price.usd;

        const tokenPrices = initialDataResponse[1];
        const tokenPricesData = tokenPrices.data.contracts;
        let priceOfInsta = 0;

        for (let i in tokenPricesData) {
            if (
                tokenPricesData[i].symbol === 'INSTA' &&
                tokenPricesData[i].tokenAddress ===
                    'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ'
            )
                priceOfInsta = tokenPricesData[i].usdValue;
        }

        for (let key in FARMS_CONFIG) {
            dexPromises.push(
                getLpPriceFromDex(
                    FARMS_CONFIG[key].NAME,
                    FARMS_CONFIG[key].PARAMS.DEX
                )
            );
        }

        const response = await Promise.all(dexPromises);
        let lpPricesInUsd = {};

        for (let i in response) {
            if (response[i].lpPriceInXtz * xtzPriceInUsd) {
                lpPricesInUsd[response[i].identifier] =
                    response[i].lpPriceInXtz * xtzPriceInUsd;
            } else {
                lpPricesInUsd[response[i].identifier] = response[i].totalAmount;
            }
        }
        for (let key in FARMS_CONFIG) {
            promises.push(
                fetchStorageOfStakingContract(
                    FARMS_CONFIG[key].NAME,
                    FARMS_CONFIG[key].PARAMS.CONTRACT,
                    FARMS_CONFIG[key].PARAMS.DECIMAL,
                    lpPricesInUsd[FARMS_CONFIG[key].NAME],
                    priceOfInsta
                )
            );
        }

        let farmsData = {};
        const farmResponse = await Promise.all(promises);
        for (let i in farmResponse) {
            farmsData = {
                identifier: farmResponse[i].identifier,
                APR: farmResponse[i].APR,
                totalLiquidty: farmResponse[i].totalLiquidty,
                rewardRate: farmResponse[i].rewardRate,
            };
        }

        return {
            success: true,
            response: farmsData,
        };
    } catch (error) {
        return {
            success: false,
            response: {},
        };
    }
};
