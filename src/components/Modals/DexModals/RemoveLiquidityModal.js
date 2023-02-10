import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';

import { DEX_NETWORK } from '../../../config/config';
import { CONTRACT_CONFIG } from '../../../config/network.config';
import { GET_USER_LIQUIDITY_POSITION } from '../../../redux/actions/dex/action.liquidity';
import { ThemeContext } from '../../../routes/root';

function RemoveLiquidityModal(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { isOpen, handleClose, setRemoveLiquidityPair } = props;

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: !matches ? '90vw' : '25vw',
        bgcolor: theme ? '#fff' : '#160335',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        outline: 'none',
        pb: 3,
        px: 2,
    };

    React.useEffect(() => {
        if (props.liquidityPair) {
            props.getUserLiquidityPositions({
                tokenIndex: props.liquidityPair.id,
                baseTokenDecimal: props.liquidityPair.DECIMAL_SECOND_TOKEN,
                contractAddress: props.liquidityPair.DEX_ADDRESS,
                NETWORK: props.selectedNetwork,
            });
        }
    }, []);

    const getTokenFromTokenId = (tokenId) => {
        if (tokenId === '0') {
            return {
                name: props.liquidityPair.FIRST_TOKEN_NAME,
                logo: props.liquidityPair.FIRST_TOKEN_LOGO,
                tokenId: props.liquidityPair.FIRST_TOKEN_ID,
                tokenAddress: CONTRACT_CONFIG[DEX_NETWORK].TOKEN_ADDRESS,
                tokenType: props.liquidityPair.FIRST_TOKEN_TYPE,
            };
        } else {
            return {
                name: props.liquidityPair.SECOND_TOKEN_NAME,
                logo: props.liquidityPair.SECOND_TOKEN_LOGO,
                tokenId: props.liquidityPair.SECOND_TOKEN_ID,
                tokenAddress: props.liquidityPair.TOKEN_ADDRESS,
                tokenType: props.liquidityPair.SECOND_TOKEN_TYPE,
            };
        }
    };
    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={isOpen}
            onClose={() => handleClose('dex')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <div className='d-flex justify-content-end'>
                        <div
                            className='d-flex justify-content-center align-items-center'
                            onClick={() => handleClose('dex')}
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
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h6>Select liquidity</h6>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div
                                className='text-12 fw-500 px-2'
                                style={{
                                    padding: '3px',
                                }}
                            >
                                Token
                            </div>
                            <div
                                className='text-12 fw-500 px-2'
                                style={{
                                    padding: '3px',
                                }}
                            >
                                Amount
                            </div>
                        </div>
                        <div
                            className='mt-2'
                            style={{
                                maxHeight: '200px',
                                overflowY: 'scroll',
                            }}
                        >
                            {props.userLiquidityPositions.positions.map(
                                (position, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex ${
                                            !theme
                                                ? 'token-hover-2'
                                                : 'token-hover'
                                        } py-2 cursor-pointer mb-1 text-12  d-flex justify-content-between align-items-center px-2 border-10 cursor-pointer align-items-center`}
                                        onClick={() => {
                                            setRemoveLiquidityPair({
                                                name: getTokenFromTokenId(
                                                    position.tokenId
                                                ).name,
                                                positionId: position.positionId,
                                                logo: getTokenFromTokenId(
                                                    position.tokenId
                                                ).logo,
                                                tokenId: getTokenFromTokenId(
                                                    position.tokenId
                                                ).tokenId,
                                                tokenAddress:
                                                    getTokenFromTokenId(
                                                        position.tokenId
                                                    ).tokenAddress,
                                                amount: position.amount,
                                                initialAmount: position.amount,
                                                tokenType: getTokenFromTokenId(
                                                    position.tokenId
                                                ).tokenType,
                                            });
                                            handleClose();
                                        }}
                                    >
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div
                                                style={{
                                                    zIndex: '1',
                                                }}
                                            >
                                                <img
                                                    src={
                                                        getTokenFromTokenId(
                                                            position.tokenId
                                                        ).logo
                                                    }
                                                    style={{
                                                        borderRadius: '100%',
                                                    }}
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>

                                            <div className='ms-2'>
                                                <div className='fw-500'>
                                                    {
                                                        getTokenFromTokenId(
                                                            position.tokenId
                                                        ).name
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className='text-mini fw-500 px-2'
                                            style={{
                                                padding: '3px',
                                            }}
                                        >
                                            {position.amount}&nbsp;
                                            {
                                                getTokenFromTokenId(
                                                    position.tokenId
                                                ).name
                                            }
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getUserLiquidityPositions: (payload) =>
        dispatch(GET_USER_LIQUIDITY_POSITION(payload)),
});

const mapStateToProps = (state) => ({
    selectedNetwork: state.selectedNetwork,
    stakedPair: state.stakedPair,
    liquidityPair: state.liquidityPair,
    userLiquidityPositions: state.userLiquidityPositions,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveLiquidityModal);
