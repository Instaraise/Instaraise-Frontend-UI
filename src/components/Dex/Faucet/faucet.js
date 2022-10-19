import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import TezoIcon from '../../../assets/images/tezos_icon.png';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import { MINT_TOKENS } from '../../../redux/actions/dex/action.dex';
import { switchAddress } from '../../../redux/actions/wallet/action.wallet';
import { connectWallet } from '../../../redux/actions/wallet/action.wallet';
import { ThemeContext } from '../../../routes/root';
export const notify = (mesg) => toast(mesg);
const Faucet = (props) => {
    const { wallet, selectedNetwork, switchAddress, connectWallet } = props;
    const { theme } = React.useContext(ThemeContext);
    const [loading, setLoading] = React.useState(false);
    const mintTokens = async () => {
        try {
            setLoading(true);
            const response = await props.mintTokens({
                //this is an action
                network: selectedNetwork, //testnet will go here
            });
            if (response.payload.status) {
                setLoading(false);
                notify('Tokens sent to your address');
            } else {
                throw new Error();
            }
        } catch (error) {
            notify('Something went wrong, Please try again later');
            setLoading(false);
        }
    };
    return (
        <div className='text-center w-100 text-dark-to-light p-3 d-flex justify-content-center'>
            {/* <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme={!theme ? 'dark' : 'light'}
                progressStyle={{
                    backgroundColor: '#5a1eab',
                }}
                pauseOnHover
            /> */}
            <div>
                <div className='d-flex justify-content-center my-3'>
                    <img
                        src={TezoIcon}
                        alt='Tezos Icon'
                        className='me-3'
                        width={50}
                        height={50}
                    />
                    <h3>Tezos FA Tokens Faucet</h3>
                </div>
                <p className='text-14 mx-auto '>
                    This faucet will provide you with 1 FA1.2 and 6 FA2 tokens
                    (1000 and 2000 respectively), on ghostnet on Tezos. All
                    tokens have metadata icons and names resembling existing
                    tokens, but these are strictly for testing purpose only.
                    They have no financial value.
                </p>
                <div
                    style={{
                        marginTop: '40px',
                        marginBottom: '40px',
                    }}
                >
                    {DEX_TOKEN_CONFIG.map((item, index) => (
                        <div
                            className='d-flex flex-column flex-lg-row my-3 justify-content-center align-items-center'
                            key={index}
                        >
                            <div className='d-flex justify-content-center align-items-center'>
                                <div>
                                    <img
                                        src={item.TOKEN_LOGO}
                                        width={30}
                                        style={{
                                            borderRadius: '100%',
                                        }}
                                        height={30}
                                        alt={item.TOKEN_NAME}
                                    />
                                </div>
                                <div className='mx-2 fw-bold'>Test</div>
                                <div className='me-2 fw-bold'>
                                    {item.TOKEN_NAME}
                                </div>
                            </div>

                            <div className='my-2 my-lg-0'>
                                {item.TOKEN_ADDRESS}
                            </div>
                            <div className='mx-2 fw-bold my-1 my-lg-0'>
                                ({item.TOKEN_TYPE})
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-75 mx-auto'>
                    <hr />
                </div>
                <div className='w-50 mx-auto'>
                    <form
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     mintTokens();
                        // }}
                        className='form-group-1  mx-auto my-0  text-start '
                    >
                        <label htmlFor='usr' className='text-start bg-f9'>
                            Mint to*
                        </label>
                        <input
                            value={wallet ? wallet : 'Wallet not connected'}
                            disabled={!wallet}
                            className='text-start me-2 ps-5 text-10 w-100 rounded text-dark-to-light margin-auto'
                            style={{
                                border: theme
                                    ? '0.2px solid #4e5d78'
                                    : '0.2px solid #fff',
                                fontSize: '0.8rem',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                cursor: !wallet && 'not-allowed',
                            }}
                        />
                        <div
                            onClick={() => {
                                switchAddress({
                                    NETWORK: selectedNetwork,
                                });
                            }}
                            className='text-12 text-toggle-selected my-1 mb-3 cursor-pointer'
                        >
                            Switch Address
                        </div>
                    </form>
                    {!wallet && (
                        <button
                            type='button'
                            onClick={() => {
                                connectWallet({
                                    NETWORK: 'mainnet',
                                });
                            }}
                            className='text-center button-primary btn-faucet w-100 py-1  rounded py-2 margin-auto'
                        >
                            Connect wallet
                        </button>
                    )}
                    {loading && wallet && (
                        <button className='d-flex align-items-center justify-content-center text-center btn-faucet w-100 rounded py-2 margin-auto'>
                            <div className='rotate-2'>
                                <BiLoaderAlt size={20} />{' '}
                            </div>
                            <span className='ml-1 text-14'>
                                &nbsp;Adding tokens...
                            </span>
                        </button>
                    )}
                    {!loading && wallet && (
                        <button
                            onClick={() => {
                                mintTokens();
                            }}
                            className='text-center button-primary btn-faucet w-100 py-1  rounded py-2 margin-auto'
                        >
                            Mint
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    switchAddress: (payload) => dispatch(switchAddress(payload)),
    mintTokens: (payload) => dispatch(MINT_TOKENS(payload)),
});
const mapStateToProps = (state) => ({
    wallet: state.wallet,
    selectedNetwork: state.selectedNetwork,
});
export default connect(mapStateToProps, mapDispatchToProps)(Faucet);
