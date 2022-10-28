import { useMediaQuery } from '@mui/material';
import { Slide } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ErrorAnimation_Dark from '../../../assets/animations/dark/new_dark_transfer.gif';
import ErrorAnimation_Light from '../../../assets/animations/light/new_light_transfer.gif';
import { ThemeContext } from '../../../routes/root';

function TransferModal(props) {
    const symbol = props.selectedToken.from.TOKEN_SYMBOL;
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { setModalType } = props;

    const location = useLocation();
    const isSwapPage = location.pathname.includes('swap');

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
                onClose={() => null}
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
                                alt='success-animation'
                                width={110}
                                height={90}
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: '20px',
                            }}
                        >
                            {isSwapPage && (
                                <div
                                    style={{
                                        backgroundColor: theme
                                            ? '#F9FAFA'
                                            : '#080421',
                                        width: '100%',
                                        marginBottom: '12px',
                                        border: '0.2px solid #9e9e9e3d',
                                        cursor: 'default',
                                    }}
                                    className='btn shadow-none border-10 text-dark-to-light text-14'
                                >
                                    Swap {props.handle_pay_values_market}{' '}
                                    {symbol}
                                </div>
                            )}

                            <p className='text-center'>
                                {' '}
                                Confirm the transaction in your wallet{' '}
                            </p>
                        </div>
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedToken: state.selectedToken,
    handle_pay_values_market: state.handle_pay_values_market,
});

export default connect(mapStateToProps, null)(TransferModal);
