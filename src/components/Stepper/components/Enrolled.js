import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import hand_dark_Img from '../../../assets/Ido/stepper/hand_dark_Img.png';
import hand_Img from '../../../assets/Ido/stepper/hand_Img.png';
import { DATA_URL } from '../../../config/config';
import { ThemeContext } from '../../../routes/root';
const Enrolled = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const [loading, setLoading] = React.useState(false);
    const [enrollSuccess, setEnrollSuccess] = React.useState(props.isEnrolled);

    const enrollUser = async () => {
        try {
            setLoading(true);
            const request = fetch(
                `${DATA_URL}/v1/enroll?userAddress=${props.wallet}&projectName=${props.ALIAS}`,
                {
                    method: 'POST',
                }
            );
            const response = await request;
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    setEnrollSuccess(true);
                }, 2000);
                setTimeout(() => {
                    props.fetchkyc();
                }, 5000);
            }
        } catch (error) {
            props.fetchkyc();
        }
    };

    return (
        <div>
            <div className='text-center mb-2'>
                {loading && (
                    <div className='spinner-border ' role='status'></div>
                )}
                {!loading && (
                    <div>
                        {theme ? (
                            <img
                                src={hand_Img}
                                width={80}
                                height={80}
                                alt='hand'
                            />
                        ) : (
                            <img
                                src={hand_dark_Img}
                                width={80}
                                height={80}
                                alt='hand'
                            />
                        )}
                    </div>
                )}
            </div>
            <h6 className='text-center '>
                <span>
                    {loading && 'Enrolling your participation'}
                    {!loading && (
                        <div className='w-75 m-auto mb-2'>
                            {enrollSuccess
                                ? `You have successfully enrolled in the sale 🎉`
                                : `Enrollment for the sale has started click on the below link to ensure your are participation`}
                        </div>
                    )}

                    {!enrollSuccess && !loading && (
                        <Link
                            to='#'
                            className='router-l router-l-u'
                            onClick={() => enrollUser()}
                        >
                            Enroll for the Sale
                            <BiLinkExternal className='ml-1' />
                        </Link>
                    )}
                    {loading && <div>Please wait...</div>}
                </span>
            </h6>
        </div>
    );
};

export default Enrolled;
