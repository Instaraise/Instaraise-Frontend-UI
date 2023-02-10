import { useMediaQuery } from '@mui/material';
import { Slide } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

import ErrorAnimation_Dark from '../../../assets/animations/dark/new_dark_error.gif';
import ErrorAnimation_Light from '../../../assets/animations/light/new_light_error.gif';
import { ThemeContext } from '../../../routes/root';

export default function ErrorModal(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { setModalType } = props;
    const styleContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItemsCenter: 'center',
    };
    const style = {
        position: 'absolute',
        top: '20%',
        width: !matches ? '90vw' : '25vw',
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
                                        : 'black',
                                }}
                            >
                                <MdClose color='white' size={20} />
                            </div>
                        </div>
                        <div
                            className='d-flex justify-content-center'
                            style={{
                                marginBottom: '10px',
                            }}
                        >
                            <img
                                src={
                                    theme
                                        ? ErrorAnimation_Light
                                        : ErrorAnimation_Dark
                                }
                                alt='error-animation'
                                width={90}
                                height={90}
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: '30px',
                            }}
                        >
                            <h6
                                className='text-center'
                                style={{
                                    color: theme ? '#5E0EE2' : '#fff',
                                    fontSize: '20px',
                                }}
                            >
                                Error!
                            </h6>
                            <p className='text-center'>
                                {' '}
                                Please try again in a while.
                            </p>
                        </div>
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
}
