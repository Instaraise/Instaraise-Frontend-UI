import axios from 'axios';
import React from 'react';

import JoinPoolModal from './Project/JoinPoolModal';
import StakeModal from './Staking/StakeModal';
import UnStakeModal from './Staking/UnstakeModal';
import WithdrawModal from './Staking/WithdrawModal';
import ErrorModal from './Transaction/ErrorModal';
import SuccessModal from './Transaction/SuccessModal';
import TransferModal from './Transaction/TransferModal';
import { NETWORK, RPC_NODES } from '../../config/config';

export const FetchBalance = async (wallet) => {
    try {
        const URL = `${RPC_NODES[NETWORK]}/chains/main/blocks/head/context/contracts/${wallet}/balance`;
        const API_RESPONSE = await axios(URL);
        if (API_RESPONSE.status === 200) {
            const balance = (
                API_RESPONSE.data / Math.pow(10, 6)
            ).PrecisionMaker(3);
            return balance;
        } else {
            return 0;
        }
    } catch (error) {
        return 0;
    }
};
export const Modal_Background_Color_Dark = '#160335';
export const Modal_Background_Color_Light = '#fff';
export default function MainModal(props) {
    if (props.modalType === 'success') {
        return <SuccessModal {...props} />;
    } else if (props.modalType === 'error') {
        return <ErrorModal {...props} />;
    } else if (props.modalType === 'transfer') {
        return <TransferModal {...props} />;
    } else if (props.modalType === 'stake') {
        return <StakeModal {...props} />;
    } else if (props.modalType === 'unstake') {
        return <UnStakeModal {...props} />;
    } else if (props.modalType === 'withdraw') {
        return <WithdrawModal {...props} />;
    } else if (props.modalType === 'joinpool') {
        return <JoinPoolModal {...props} />;
    } else if (props.modalType === 'removeLiquidity') {
        return <JoinPoolModal {...props} />;
    }
}
