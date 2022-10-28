import React from 'react';

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
    }
}
