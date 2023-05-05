import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { BsShieldFillCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Application = (props) => {
    if (props.isWhitelisted) {
        return (
            <div>
                <div className='text-center mb-2'>
                    <BsShieldFillCheck size={65} />
                </div>
                <h6 className='text-center'>
                    <span>
                        Congrats! you have successfully completed your KYC.
                    </span>
                </h6>
            </div>
        );
    }
    return (
        <div>
            <div className='text-center mb-2'>
                <BsShieldFillCheck size={65} />
            </div>
            <h6 className='text-center'>
                <span>
                    Go ahead complete your KYC now{' '}
                    <Link
                        to='#'
                        className='router-l router-l-u'
                        onClick={() =>
                            window.open('https://instaraise.synaps.io/signup')
                        }
                    >
                        Apply now <BiLinkExternal />
                    </Link>
                </span>
            </h6>
        </div>
    );
};

export default Application;
