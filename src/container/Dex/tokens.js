import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import TokenTable from '../../components/Dex/Tokens/tokenTables';
const Trade = () => {
    return (
        <div>
            <AppLayout>
                <div className=''>
                    <TokenTable />
                </div>
            </AppLayout>
        </div>
    );
};
export default Trade;
