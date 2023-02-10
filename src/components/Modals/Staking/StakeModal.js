// eslint-disable-next-line
import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

import { ThemeContext } from '../../../routes/root';

const buttonColor = {
    backgroundColor: '#5E0EE2',
};

const StakeModal = (props) => {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const [stakeAmount, setstakeAmount] = React.useState(
        Math.min(10, props.balance)
    );
    const [error, setError] = React.useState({
        status: false,
        message: '',
    });
    const { setModalType, stake_title } = props;

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: !matches ? '90vw' : '30vw',
        backgroundColor: theme ? 'rgb(255, 255, 255)' : 'rgb(22, 3, 53)',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        outline: 'none',
        pb: 3,
        px: 2,
    };

    const handleChange = (value) => {
        setstakeAmount(value);
    };

    React.useEffect(() => {
        setError({
            status: false,
            message: '',
        });
        if (isNaN(stakeAmount)) {
            setError({
                status: true,
                message: 'Please use numbers only',
            });
        }
        if (stakeAmount <= 0) {
            setError({
                status: true,
                message: 'Please enter a valid amount',
            });
        }
        if (Number(stakeAmount) > Number(props.balance)) {
            setError({
                status: true,
                message: 'Insufficient Balance',
            });
        }
    }, [stakeAmount]);
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
                    <div className='d-flex justify-content-end'>
                        <div
                            className='d-flex justify-content-center align-items-center'
                            onClick={() => setModalType(null)}
                            style={{
                                cursor: 'pointer',
                                border: '2px solid #ffff',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                marginTop: '-8px',
                                marginRight: '-24px',
                                backgroundColor: theme ? '#4e5d78' : '#080421',
                            }}
                        >
                            <MdClose color='white' size={20} />
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Typography
                                id='transition-modal-title'
                                variant='h6'
                                component='h6'
                            >
                                {stake_title}
                            </Typography>
                        </div>

                        <hr />
                        <div className='fw-600'>
                            Please enter the amount below:
                        </div>
                        <div
                            style={{
                                backgroundColor: theme ? '#f9fafa' : '#080421',
                            }}
                            className='mt-3 w-100 py-1 mb-2 d-flex justify-content-between align-items-center border-0  input-bar rounded shadow-none'
                        >
                            <input
                                onChange={(e) => handleChange(e.target.value)}
                                value={stakeAmount}
                                className='w-100 text-dark-to-light text-14 ms-2 py-2 px-2'
                                type='text'
                                placeholder='Enter stake amount'
                            />
                            <div className='me-2'>
                                <button
                                    onClick={() =>
                                        setstakeAmount(props.balance)
                                    }
                                    className='btn button-grey d-inline-flex align-self-end  text-white btn-sm shadow-none rounded-2 '
                                >
                                    max
                                </button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span className='error'>{error.message}</span>
                            <div className='text-14'>
                                Balance: {props.balance}
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <button
                                style={buttonColor}
                                onClick={() => {
                                    if (
                                        !error.status &&
                                        Number(stakeAmount) <=
                                            Number(props.balance) &&
                                        !isNaN(stakeAmount)
                                    ) {
                                        props.staking(stakeAmount);
                                    }
                                }}
                                className='btn shadow-none border-0 w-100 me-2 mt-3 text-white'
                            >
                                Stake
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className='btn button-grey shadow-none w-100 mt-3 text-white'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};
export default StakeModal;
