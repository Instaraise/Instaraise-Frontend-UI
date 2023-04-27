import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

import { FetchBalance } from '..';
import { Modal_Background_Color_Dark, Modal_Background_Color_Light } from '..';
import { ThemeContext } from '../../../routes/root';

const buttonColor = {
    backgroundColor: '#5E0EE2',
};

export default function JoinPoolModal(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: !matches ? '90vw' : '30vw',
        bgcolor: theme
            ? Modal_Background_Color_Light
            : Modal_Background_Color_Dark,
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        py: 3,
        px: 2,
        outline: 'none',
    };
    const MAX_AMOUNT = 500;
    const MIN_AMOUNT = 50;

    const [balance, setBalance] = React.useState(0);
    const [stakeAmount, setstakeAmount] = React.useState(MIN_AMOUNT);
    const [error, setError] = React.useState({
        status: false,
        message: '',
    });
    const { setModalType } = props;

    React.useEffect(() => {
        setError({
            status: false,
            message: '',
        });
        if (stakeAmount <= 0 || stakeAmount === '') {
            setError({
                status: true,
                message: 'Please enter a valid amount',
            });
            return;
        }

        if (Number(stakeAmount) < Number(MIN_AMOUNT)) {
            setError({
                status: true,
                message: `Value should be between ${MIN_AMOUNT} and ${MAX_AMOUNT}`,
            });
        }
        if (Number(stakeAmount) > Number(MAX_AMOUNT)) {
            setError({ status: true, message: 'Amount exceeded the limit' });
        }
        if (Number(stakeAmount) > balance) {
            setError({ status: true, message: 'Insufficient balance' });
        }
    }, [stakeAmount, balance]);

    const handleChange = (value) => {
        setstakeAmount(value);
    };

    React.useEffect(() => {
        FetchBalance(props.wallet).then((balance) => setBalance(balance));
        // eslint-disable-next-line
    }, []);

    const Joinpool = async () => {
        props.setModalType('transfer');
        const response = await props.participateInSale({
            amount: stakeAmount,
            STAKE_TYPE: props.saleType,
            contractAddress: props.contractAddress,
        });
        if (response.payload.success) {
            props.fetchSaleData();
            props.handleOperationId(response.payload.operationHash);
            props.setModalType('success');
        } else {
            props.setModalType('error');
        }
    };
    let AMT_YOU_RECIEVE = 0;
    if (props.projectData.MULTI_SWAP_RATE) {
        if (props.saleType === 'private') {
            AMT_YOU_RECIEVE = error.status
                ? 0
                : ((stakeAmount * 1) / 0.026).PrecisionMaker(3);
        } else {
            AMT_YOU_RECIEVE = error.status
                ? 0
                : ((stakeAmount * 1) / 0.031).PrecisionMaker(3);
        }
    } else {
        AMT_YOU_RECIEVE = error.status
            ? 0
            : (
                  (stakeAmount * 1) /
                  props.projectData.TOKEN_PRICE
              ).PrecisionMaker(3);
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={true}
            onClose={() => setModalType(null)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={true}>
                <Box sx={style}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Typography
                            id='transition-modal-title'
                            variant='h6'
                            component='h6'
                        >
                            Invest in Pool
                        </Typography>
                        <Typography
                            id='transition-modal-title'
                            variant='h5'
                            component='h5'
                        >
                            <MdClose
                                onClick={() => setModalType()}
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </Typography>
                    </div>
                    <div className='mt-2 py-1 mb-0 d-flex alert px-0 justify-content-between align-items-center  rounded shadow-none'>
                        <span className='  text-12'>
                            *The maximum allowed per user is {MAX_AMOUNT} ꜩ
                        </span>
                    </div>
                    <div
                        style={{
                            backgroundColor: theme ? '#ececec' : '#080421',
                        }}
                        className='py-3 px-2 border border-black  d-flex justify-content-between align-items-center  rounded shadow-none'
                    >
                        <span className='  text-12'>Wallet Balance</span>
                        <div className='text-12'>{balance} xtz</div>
                    </div>
                    <div className='py-2'>
                        <span className='t fw-600  text-12'>
                            Enter your amount
                        </span>
                    </div>
                    <div className='w-100 py-1 mb-2  d-flex justify-content-between align-items-center input-bar rounded shadow-none'>
                        <input
                            onChange={(e) => {
                                e.preventDefault();
                                handleChange(e.target.value);
                            }}
                            value={stakeAmount}
                            className='w-100 text-dark-to-light text-sm ms-2 py-2 px-2'
                            type='number'
                            min={MIN_AMOUNT}
                            onWheel={(e) => {
                                if (e.deltaY > 0) {
                                    handleChange(stakeAmount);
                                } else {
                                    handleChange(MIN_AMOUNT);
                                }
                            }}
                            placeholder='Enter amount'
                        />
                        <div className='me-2'>
                            <button
                                style={buttonColor}
                                onClick={() => {
                                    setError({
                                        status: false,
                                        message: ' ',
                                    });
                                    setstakeAmount(balance);
                                }}
                                className='btn d-inline-flex align-self-end connect-wallet-button text-sm fw-bold text-white shadow-none rounded-2 '
                            >
                                max
                            </button>
                        </div>
                    </div>
                    <span className='error'>
                        {error.status ? error.message : ''}
                    </span>
                    <div className='text-end '>
                        <span className='text-end fw-600  text-12'>
                            You will receive {AMT_YOU_RECIEVE}
                            &nbsp;
                            {props.projectData.TOKEN_NAME} tokens
                        </span>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <button
                            onClick={() => setModalType('null')}
                            style={{
                                color: '#5e0ee2',
                            }}
                            className='btn button-grey text-white shadow-none w-100 me-2 '
                        >
                            Cancel
                        </button>
                        <button
                            style={buttonColor}
                            onClick={() => {
                                if (!error.status) {
                                    Joinpool();
                                }
                            }}
                            className='btn ms-2 w-100 shadow-none  text-white'
                        >
                            Confirm
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
