import { useMediaQuery } from '@mui/material';
import { Slide } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import truncateMiddle from 'truncate-middle';

import SuccessAnimation_Dark from '../../../assets/animations/dark/new_dark_success.gif';
import SuccessAnimation_Light from '../../../assets/animations/light/new_light_success.gif';
import { ThemeContext } from '../../../routes/root';

export default function SuccessModal(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { setModalType, operationId } = props;
    const styleContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItemsCenter: 'center',
    };
    const style = {
        position: 'absolute',
        top: '20%',
        width: !matches ? '90vw' : '30vw',
        backgroundColor: theme ? 'rgb(255, 255, 255)' : 'rgb(22, 3, 53)',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        outline: 'none',
        boxShadow: 24,
        px: 2,
    };

    return (
        <div>
            <Modal
                transition={Slide}
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={true}
                disableAutoFocus
                style={styleContainer}
                onClose={() => setModalType(null)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={true} timeout={1200}>
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
                        <div
                            className='d-flex justify-content-center'
                            style={{
                                marginBottom: '20px',
                            }}
                        >
                            <img
                                src={
                                    theme
                                        ? SuccessAnimation_Light
                                        : SuccessAnimation_Dark
                                }
                                alt='success-animation'
                                width={85}
                                height={80}
                            />
                        </div>
                        <h6
                            className='text-center text-20'
                            style={{
                                color: theme ? '#5E0EE2' : '#fff',
                            }}
                        >
                            Congratulations!
                        </h6>
                        <h6 className='text-center'>
                            Operation ID:&nbsp;
                            <button
                                className='router-l'
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                }}
                                onClick={() => {
                                    window.open(
                                        `https://ghostnet.tzkt.io/${operationId}`
                                    );
                                }}
                            >
                                {truncateMiddle(operationId, 7, 7, '...')}
                                <BsBoxArrowInUpRight />
                            </button>
                        </h6>
                        <p
                            className='text-center'
                            style={{
                                marginBottom: '30px',
                            }}
                        >
                            {' '}
                            Your transaction was added to the pool successfully.
                        </p>
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
}
