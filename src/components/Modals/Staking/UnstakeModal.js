// eslint-disable-next-line
import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import { WITHDRAWFEES } from '../../../config/config';
import { ThemeContext } from '../../../routes/root';

const stakeStyle = {
    border: '1px solid #E5E5E5',
};

const stakes = {
    borderTop: '1px solid #E5E5E5',
    maxHeight: '150px',
    overflowY: 'scroll',
};

const stakes2 = {
    maxHeight: '150px',
    overflowY: 'scroll',
};

export const UnStakeModal = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const matches = useMediaQuery('(min-width:600px)');
    const { setModalType, currentBlock, unstake_title } = props;

    const buttonColor = {
        backgroundColor: theme ? '#5E0EE2' : `#5a1eab`,
    };

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        right: '50vw',
        width: !matches ? '90vw' : '30vw',
        backgroundColor: theme ? 'rgb(255, 255, 255)' : 'rgb(22, 3, 53)',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        outline: 'none',
        pb: 3,
        px: 2,
    };

    const [up, down] = React.useState(false);
    const [selectedstake, setSelectedStake] = React.useState([]);
    const initialState = props.singularStakes.map((stake) => {
        let data = {
            id: nanoid(),
            name: nanoid().toString(),
            stake,
        };
        return data;
    });
    const [checkState, setcheckState] = React.useState(initialState);
    const handleChange = (e, stake) => {
        e.preventDefault();
        const { name, checked } = e.target;
        let newCheck = checkState.map((stake) =>
            stake.name === name ? { ...stake, isChecked: checked } : stake
        );
        setcheckState(newCheck);
        if (checked) {
            setSelectedStake([...selectedstake, stake]);
        } else {
            setSelectedStake(
                selectedstake.filter((item) => item.id !== stake.id)
            );
        }
    };

    const getPercentage = (block) => {
        if (!block) {
            return 0;
        }
        if (props.inactive) {
            return 0;
        }
        let percentage;
        WITHDRAWFEES.some((item) => {
            if (currentBlock - parseInt(block) <= item.BLOCK_COUNT) {
                percentage = item.WITHDRAWAL_FEE;
                return true;
            } else {
                percentage = 4;
                return false;
            }
        });
        if (percentage) {
            return percentage;
        } else {
            return 1;
        }
    };

    const getTotal = () => {
        let sum = 0;
        // eslint-disable-next-line
        selectedstake.map((item) => {
            let per = getPercentage(item.stake.block);
            if (props.inactive) {
                sum = sum + item.stake.amount;
            } else {
                sum = sum + (item.stake.amount * per) / 100;
            }
        });
        return sum;
    };

    return (
        <div>
            <Modal
                style={{
                    margin: 'auto',
                }}
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                disableEnforceFocus
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
                                    backgroundColor: theme
                                        ? '#4e5d78'
                                        : '#080421',
                                }}
                            >
                                <MdClose color='white' size={20} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Typography
                                id='transition-modal-title'
                                variant='h6'
                                component='h6'
                            >
                                {unstake_title}
                            </Typography>
                        </div>
                        <div style={stakeStyle} className='rounded mt-3 mb-2'>
                            <div
                                className=' p-1  d-flex justify-content-between align-items-center  rounded shadow-none'
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => down(!up)}
                            >
                                <span className='text-14'>Select Stake</span>
                                <div className='me-3'>
                                    {!up ? (
                                        <FaChevronCircleDown
                                            style={{
                                                cursor: 'pointer',
                                                color: '#5E0EE2',
                                            }}
                                            className='d-inline-flex align-self-end'
                                            onClick={() => down(!up)}
                                        />
                                    ) : (
                                        <FaChevronCircleUp
                                            style={{
                                                cursor: 'pointer',
                                                color: '#5E0EE2',
                                            }}
                                            className='d-inline-flex align-self-end  '
                                            onClick={() => down(!up)}
                                        />
                                    )}
                                </div>
                            </div>
                            {up && (
                                <div style={stakes}>
                                    {checkState.map((stake) => (
                                        <div
                                            key={nanoid()}
                                            className=' py-2 px-2 d-flex justify-content-between align-items-center'
                                        >
                                            <div>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input'
                                                    name={`${stake.name}`}
                                                    checked={
                                                        stake?.isChecked ||
                                                        false
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(e, stake)
                                                    }
                                                />
                                                <span className='ms-2 text-14'>
                                                    Stake {stake.stake.mapId}
                                                </span>
                                            </div>
                                            <div className='pe-3'>
                                                {stake.stake.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='text-12 fw-600 text-end'>
                            <span className=''>
                                Total Amount :{' '}
                                {props.stakeamount.PrecisionMaker(0)}
                            </span>
                        </div>
                        {selectedstake.length > 0 && (
                            <div className='text-14' key={nanoid()}>
                                <span>Fee breakdown</span>
                                <div
                                    style={stakeStyle}
                                    className='rounded mt-3 mb-2'
                                >
                                    <div style={stakes2}>
                                        {selectedstake.map((item, index) => (
                                            <div
                                                key={index}
                                                className=' py-2 px-2 d-flex justify-content-between align-items-center'
                                            >
                                                <div>
                                                    <span className='ms-2 text-14'>
                                                        Stake&nbsp;
                                                        {item.stake.mapId}
                                                    </span>
                                                </div>
                                                <div className='pe-3'>
                                                    <div>
                                                        {props.inactive
                                                            ? '0'
                                                            : getPercentage(
                                                                  item.stake
                                                                      .block
                                                              )}
                                                        %
                                                    </div>
                                                </div>
                                                <div className='pe-3'>
                                                    {props.inactive
                                                        ? item.stake.amount
                                                        : (item.stake.amount *
                                                              getPercentage(
                                                                  item.stake
                                                                      .block
                                                              )) /
                                                          100}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            borderTop: '1px solid #E5E5E5',
                                        }}
                                        className=' py-2 px-2 d-flex justify-content-between align-items-center'
                                    >
                                        <div>
                                            <span className='ms-2 text-14'>
                                                Total Fees
                                            </span>
                                        </div>
                                        <div className='pe-3'>
                                            {getTotal().PrecisionMaker(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='d-flex justify-content-center align-items-center'>
                            <button
                                style={buttonColor}
                                onClick={() => {
                                    if (selectedstake.length > 0) {
                                        props.unstake(selectedstake);
                                    }
                                }}
                                className='btn shadow-none border-0 me-2 w-100 mt-3 text-white'
                            >
                                Unstake
                            </button>
                            <button
                                onClick={() => {
                                    setModalType(null);
                                }}
                                className='btn shadow-none button-grey w-100 mt-3 text-white'
                            >
                                Cancel
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
export default UnStakeModal;
