import React from 'react';
const TokenTables = () => {
    return (
        <div className='card_i shadow-sm '>
            <div className='p-4 d-flex text-dark-to-light justify-content-between align-item-center'>
                <h6 className='d-flex mt-1 flex-column justify-content-start p-0 text-dark-to-light fw-bold'>
                    Tokens
                </h6>
                <div className='py-2 d-flex align-items-center px-2 border-10 search-background-change'>
                    <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'></path>
                    </svg>
                    <input
                        placeholder='Search your token'
                        className='w-100  text-12 text-dark-to-light ms-2 text-start'
                    />
                </div>
            </div>
            <div className='table-responsive dex-card '>
                <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                    <thead className='mx-3 font-12 fw-light'>
                        <tr
                            className='margin-header image-background-color border-10'
                            style={{
                                color: '#b5b5c3',
                            }}
                            colSpan={2}
                        >
                            {/* <th
                                className=' image-background-color name-col-l'
                                style={{
                                    minWidth: '80px',
                                    position: 'sticky',

                                    left: '0',
                                    zIndex: '1',
                                }}
                            >
                                <div className='fw-500 d-flex align-items-center justify-content-start  my-2'>
                                    <div className='me-2 me-lg-4 text-dark-to-light cursor-pointer'>
                                        {selected ? (
                                            <RiShieldFlashFill
                                                size={25}
                                                onClick={() => {
                                                    setAllTokens(
                                                        props.selectedNetwork ===
                                                            'TESTNET'
                                                            ? TESTNET.DEX_TOKEN_CONFIG
                                                            : MAINNET.DEX_TOKEN_CONFIG
                                                    );
                                                    setSelected(!selected);
                                                }}
                                            />
                                        ) : (
                                            <RiShieldFlashLine
                                                size={25}
                                                onClick={() =>
                                                    allFavouriteTokens()
                                                }
                                            />
                                        )}
                                    </div>
                                    <div>&nbsp;Name</div>
                                </div>
                            </th> */}
                            <th
                                style={{
                                    minWidth: '100px',
                                }}
                            >
                                <div className='fw-500  text-center my-2 '>
                                    Name
                                </div>
                            </th>
                            <th
                                style={{
                                    minWidth: '100px',
                                }}
                            >
                                <div className='fw-500  text-center my-2 '>
                                    Price
                                </div>
                            </th>
                            <th
                                style={{
                                    minWidth: '120px',
                                }}
                            >
                                <div className='fw-500 my-2'>24h Change</div>
                            </th>
                            <th
                                style={{
                                    minWidth: '120px',
                                }}
                            >
                                <div className='fw-500 my-2'>24h Volume</div>
                            </th>
                            <th
                                style={{
                                    minWidth: '120px',
                                }}
                            >
                                <div className='fw-500 my-2'>Liquidity</div>
                            </th>
                            <th
                                style={{
                                    minWidth: '180px',
                                }}
                            >
                                <div className='fw-500 my-2'>Last 7 days</div>
                            </th>
                            <th
                                className='col-sm-2 name-col-r'
                                colSpan={0.5}
                                style={{
                                    minWidth: '100px',
                                }}
                            >
                                <div className='px-3 my-2'></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-14 position-relative '>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TokenTables;
