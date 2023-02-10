import React from 'react';

const Claim = (props) => {
    const { ClaimNow } = props;
    const { TOKEN_UNLOCK_TIME, TEZ, TOKEN_NAME } = props.projectData;
    const { yourInvestments, yourAllocation } = props.SaleData.data;
    const IS_CLAIMABLE =
        new Date() >= new Date(TOKEN_UNLOCK_TIME) ? true : false;

    return (
        <>
            {yourInvestments && yourInvestments.length > 0 ? (
                <>
                    <div className='d-flex flex-column flex-lg-row flex-md-row my-4 justify-content-start justify-content-lg-between  align-items-start align-items-lg-center'>
                        <div>
                            <h6 className='m-0'>
                                Your Allocations :&nbsp;
                                {yourAllocation}
                                &nbsp;{props.projectData.TOKEN_NAME}
                            </h6>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    if (IS_CLAIMABLE) {
                                        ClaimNow();
                                    }
                                }}
                                className={`shadow-none text-14 px-3 btn btn-sm ${
                                    !IS_CLAIMABLE
                                        ? 'disable-b'
                                        : 'connect-wallet-button'
                                } `}
                            >
                                Claim now
                            </button>
                        </div>
                    </div>
                    <div
                        className='alert alert-warning p-1 mb-0 text-mini text-center'
                        role='alert'
                    >
                        Investors can claim their tokens after&nbsp;
                        {TOKEN_UNLOCK_TIME.split(' ')[0]}{' '}
                        {TOKEN_UNLOCK_TIME.split(' ')[1]}{' '}
                        {TOKEN_UNLOCK_TIME.split(' ')[2]}{' '}
                        {TOKEN_UNLOCK_TIME.split(' ')[3]}{' '}
                        {TOKEN_UNLOCK_TIME.split(' ')[4]}{' '}
                        {TOKEN_UNLOCK_TIME.split(' ')[5]}
                        &nbsp;as per vesting schedule. Even if investors forget
                        to claim, our smart contract will auto credit tokens to
                        their addresses.
                    </div>
                    <div className='mt-3  d-flex justify-content-between text-second align-items-center  border-10 shadow-none'>
                        <table className='table table-bordered border-10 '>
                            <thead className='text-center'>
                                <tr>
                                    <td className='text-14'>
                                        Transaction time
                                    </td>
                                    <td className='text-14'>XTZ Invested</td>
                                    <td className='text-14'>Tokens received</td>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {yourInvestments.map((item, index) => (
                                    <tr key={index} className='text-12'>
                                        <td>
                                            {new Date(item.time).toUTCString()}
                                        </td>
                                        <td>
                                            {item.xtzInvested}&nbsp;{TEZ}
                                        </td>
                                        <td>
                                            {item.tokensReceived}&nbsp;
                                            {TOKEN_NAME}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className='col-md-12 col-lg mw-100 h-100 mt-4 p-0'>
                    <div className='card project-detail  shadow-sm h-100 border-10'>
                        <div className='card-body  d-flex align-items-center '>
                            <h5 className='card-title text-16 m-auto'>
                                No Investments on this address
                            </h5>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Claim;
