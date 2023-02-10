// eslint-disable-next-line
import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

import { FARMS_WITHDRAWFEES, WITHDRAWFEES } from '../../../config/config';
import { ThemeContext } from '../../../routes/root';

const WithdrawModal = (props) => {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { setModalType } = props;

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: !matches ? '90vw' : '35vw',
        backgroundColor: theme ? 'rgb(255, 255, 255)' : 'rgb(22, 3, 53)',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        outline: 'none',
        px: 2,
    };
    const withdrawarray =
        props.type === 'farm' ? FARMS_WITHDRAWFEES : WITHDRAWFEES;
    return (
        <div>
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
                                onClick={() => setModalType()}
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
                            <h6 className='text-dark-to-light'>
                                Withdrawal Fee breakdown
                            </h6>
                        </div>
                        <div className='mt-3 d-flex justify-content-between align-items-center  rounded shadow-none'>
                            <table className='table table-bordered'>
                                <thead className='text-center'>
                                    <tr>
                                        <td
                                            className='text-14 '
                                            style={{
                                                color: theme
                                                    ? '#4E5D78'
                                                    : '#FFFFFF',
                                            }}
                                        >
                                            Stake duration
                                        </td>
                                        <td
                                            className='text-14'
                                            style={{
                                                color: theme
                                                    ? '#4E5D78'
                                                    : '#FFFFFF',
                                            }}
                                        >
                                            Block count
                                        </td>
                                        <td
                                            className='text-14'
                                            style={{
                                                color: theme
                                                    ? '#4E5D78'
                                                    : '#FFFFFF',
                                            }}
                                        >
                                            Withdrawal fee
                                        </td>
                                    </tr>
                                </thead>
                                <tbody
                                    className='text-center'
                                    style={{
                                        color: theme ? '#4E5D78' : '#FFFFFF',
                                    }}
                                >
                                    {withdrawarray.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.STAKE_DURATION}</td>
                                            <td>{item.BLOCK_COUNT}</td>
                                            <td>{item.WITHDRAWAL_FEE}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className='alert alert-warning p-1 m-0 text-mini'
                            role='alert'
                        >
                            The withdrawal fee is calculated from the block
                            number in which you made your deposit. Each deposit
                            can be withdrawn separately.
                        </div>
                        <div
                            className='alert alert-warning p-1 mt-2 text-mini'
                            role='alert'
                        >
                            *Please note whenever the reward pool is not active
                            the least withdrawal fees is 0% ie : after 3 weeks
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
export default WithdrawModal;
