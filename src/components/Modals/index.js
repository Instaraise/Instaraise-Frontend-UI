import React from 'react';

import StakeModal from './Staking/StakeModal';
import UnStakeModal from './Staking/UnstakeModal';
import WithdrawModal from './Staking/WithdrawModal';
import ErrorModal from './Transaction/ErrorModal';
import SuccessModal from './Transaction/SuccessModal';
import TransferModal from './Transaction/TransferModal';
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
    }
}
