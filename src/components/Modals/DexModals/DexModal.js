import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    CONVERT_TOKEN_VALUE_DEX,
    HANDLE_TOKEN_VALUES_DEX,
    SELECTED_TOKEN_DEX,
} from '../../../redux/actions/dex/action.dex';
import { GET_TOKEN_BALANCE } from '../../../redux/actions/dex/action.liquidity';
import { ThemeContext } from '../../../routes/root';

function DexModal(props) {
    const router = useNavigate();
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { isOpen, handleClose, transfer, selectedToken } = props;
    const [tokenData, setTokenArray] = React.useState(
        // DEX_TOKEN_CONFIG[props.selectedNetwork].DEX_TOKEN_CONFIG
        DEX_TOKEN_CONFIG
    );
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

    const setTokenData = (data) => {
        let newdata;
        if (transfer === 'to') {
            newdata = {
                ...selectedToken,
                to: {
                    id: data.id,
                    TOKEN_ADDRESS: data.TOKEN_ADDRESS,
                    DEX_ADDRESS: data.DEX_ADDRESS,
                    TOKEN_TYPE: data.TOKEN_TYPE,
                    TOKEN_ID: data.TOKEN_ID,
                    DECIMALS: data.DECIMALS,
                    TOKEN_NAME: data.TOKEN_NAME,
                    TOKEN_SYMBOL: data.TOKEN_SYMBOL,
                    TOKEN_URL: data.TOKEN_URL,
                    TOKEN_LOGO: data.TOKEN_LOGO,
                    DECIMAL: data.DECIMALS,
                    tokenType: data.TOKEN_TYPE,
                },
            };
            router(
                `?to=${data.DEX_ADDRESS}_${data.DECIMALS}&from=${selectedToken.from.TOKEN_SYMBOL}`
            );
        } else {
            newdata = {
                ...selectedToken,
                from: {
                    id: data.id,
                    TOKEN_ADDRESS: data.TOKEN_ADDRESS,
                    DEX_ADDRESS: data.DEX_ADDRESS,
                    TOKEN_TYPE: data.TOKEN_TYPE,
                    TOKEN_ID: data.TOKEN_ID,
                    DECIMALS: data.DECIMALS,
                    TOKEN_NAME: data.TOKEN_NAME,
                    TOKEN_SYMBOL: data.TOKEN_SYMBOL,
                    TOKEN_URL: data.TOKEN_URL,
                    TOKEN_LOGO: data.TOKEN_LOGO,
                    DECIMAL: data.DECIMALS,
                    tokenType: data.TOKEN_TYPE,
                },
            };

            if (selectedToken.to.DEX_ADDRESS) {
                router(
                    `?to=${selectedToken.to.DEX_ADDRESS}_${selectedToken.to.DECIMALS}&from=${data.TOKEN_SYMBOL}`
                );
            } else {
                router(`?from=${data.TOKEN_SYMBOL}`);
            }
        }
        props.setSelectedTokens(newdata);
        try {
            props.getTokenBalance({
                network: props.selectedNetwork,
                tokenId: newdata.from.TOKEN_ID,
                tokenType: newdata.from.TOKEN_TYPE,
                DECIMAL: newdata.from.DECIMALS,
            });
        } catch (error) {
            handleClose();
        }

        if (
            props.handle_pay_values_market !== 0 &&
            props.handle_pay_values_market
        ) {
            props.convertMarketValue({
                status: props.currencyType === 'Coin' ? false : true,
                token1:
                    transfer !== 'to'
                        ? data.TOKEN_NAME
                        : props.selectedToken.from.TOKEN_NAME,
                token2:
                    transfer === 'to'
                        ? data.TOKEN_NAME
                        : props.selectedToken.to.TOKEN_NAME,
                number: props.handle_pay_values_market,
                DEX_TO_ADDRESS:
                    transfer === 'to'
                        ? data.DEX_ADDRESS
                        : props.selectedToken.to.DEX_ADDRESS,
                DEX_FROM_ADDRESS:
                    transfer === 'from'
                        ? data.DEX_ADDRESS
                        : props.selectedToken.from.DEX_ADDRESS,

                selectedNetwork: props.selectedNetwork,
            });
        }

        handleClose();
    };

    const filterData = (search) => {
        if (search) {
            let newData = tokenData.filter((item) => {
                return item.TOKEN_SYMBOL.toLowerCase().includes(
                    search.toLowerCase()
                );
            });
            setTokenArray(newData);
        } else {
            setTokenArray(
                DEX_TOKEN_CONFIG[props.selectedNetwork]['DEX_TOKEN_CONFIG']
            );
        }
    };

    React.useEffect(() => {
        setTokenArray(DEX_TOKEN_CONFIG);
    }, [isOpen]);

    const checkShow =
        transfer === 'to' ? selectedToken.from.id : selectedToken.to.id;

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
                        <div></div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h6>Select your Token</h6>
                        </div>
                        <div className='mb-2'>
                            <div
                                className='py-2 d-flex align-items-center px-2 border-10 bg-f9'
                                style={{
                                    border: '1px solid #e6e6e6',
                                }}
                            >
                                <BiSearch />
                                <input
                                    placeholder='Search your token'
                                    onChange={(e) => filterData(e.target.value)}
                                    className='w-100  text-12 text-dark-to-light ms-2 text-start'
                                />
                            </div>
                        </div>
                        <div
                            className='pt-2 mt-2'
                            style={{
                                borderTop: '1px solid #e6e6e6',
                            }}
                        >
                            {tokenData.map((token, index) => (
                                <div key={index}>
                                    {token.id !== checkShow && (
                                        <div
                                            key={index}
                                            className={`d-flex ${
                                                !theme
                                                    ? 'token-hover-2'
                                                    : 'token-hover'
                                            } py-2 cursor-pointer mb-1 text-12  d-flex justify-content-between align-items-center px-2 border-10 cursor-pointer align-items-center`}
                                            onClick={() => setTokenData(token)}
                                        >
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div>
                                                    <img
                                                        src={token.TOKEN_LOGO}
                                                        width={25}
                                                        height={25}
                                                        style={{
                                                            borderRadius:
                                                                '100%',
                                                        }}
                                                    />
                                                </div>
                                                <div className='ms-2'>
                                                    {token.TOKEN_SYMBOL}{' '}
                                                </div>
                                            </div>
                                            <div
                                                className='text-mini fw-500 px-2'
                                                style={{
                                                    backgroundColor: '#afff9a',
                                                    borderRadius: '5px',
                                                    padding: '3px',
                                                    color: '#1c7606',
                                                }}
                                            >
                                                New!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTokens: (payload) => dispatch(SELECTED_TOKEN_DEX(payload)),
    changeMarketValue: (payload) => dispatch(HANDLE_TOKEN_VALUES_DEX(payload)),
    convertMarketValue: (payload) => dispatch(CONVERT_TOKEN_VALUE_DEX(payload)),
    getTokenBalance: (payload) => dispatch(GET_TOKEN_BALANCE(payload)),
});

const mapStateToProps = (state) => ({
    selectedToken: state.selectedToken,
    handle_pay_values_market: state.handle_pay_values_market,
    selectedNetwork: state.selectedNetwork,
});

export default connect(mapStateToProps, mapDispatchToProps)(DexModal);
