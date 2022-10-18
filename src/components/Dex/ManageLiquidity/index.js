import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import AddLiquidity from './AddLiquidity';
import AppLayout from '../../dashboard/Layout/index';
const AddLiquidityPage = () => {
    const navigate = useNavigate();
    return (
        <AppLayout>
            <div className='d-flex mt-5 justify-content-center align-items-center'>
                <div className='dex  p-2 token-information mx-3 shadow-sm'>
                    <div className='d-flex align-items-center justify-content-between px-2 py-2'>
                        <div className='d-flex justify-content-start py-2 '>
                            <div className=''>
                                <span className='text-toggle-selected-2 text-16 me-2 text-dark-to-light'>
                                    Configure liquidity
                                </span>
                            </div>
                        </div>
                        <div className='cursor-pointer d-flex align-items-center justify-content-center'>
                            <IoClose
                                size={25}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            />
                        </div>
                    </div>
                    <div className='divider px-0'></div>
                    <div className='d-flex   mt-2 align-items-center justify-content-between'>
                        <div
                            style={{
                                border: '0.2px solid #9e9e9e3d',

                                backgroundColor: '#F9FAFA',
                            }}
                            className=' w-100  cursor-pointer text-center py-2 border-10'
                        >
                            <span className='text-14 fw-500 '>
                                Add Liquidity
                            </span>
                        </div>
                    </div>
                    <AddLiquidity />
                </div>
            </div>
        </AppLayout>
    );
};
export default AddLiquidityPage;
