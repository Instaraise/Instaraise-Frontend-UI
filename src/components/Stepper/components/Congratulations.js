import React from 'react';
import { MdCelebration } from 'react-icons/md';
const Congratulations = () => {
    return (
        <div>
            <div className='text-center mb-4'>
                <MdCelebration size={70} />
            </div>
            <h6 className='text-center'>
                Congratulation! You can participate in the sale now.
            </h6>
        </div>
    );
};

export default Congratulations;
