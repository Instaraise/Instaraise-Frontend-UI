import PropTypes from 'prop-types';
import React from 'react';
import { RxDiscordLogo } from 'react-icons/rx';
import { useParams } from 'react-router-dom';

import Medium from '../../../assets/Ido/Ido_project_socials/Medium.svg';
import Telegram from '../../../assets/Ido/Ido_project_socials/Telegram.svg';
import Twitter from '../../../assets/Ido/Ido_project_socials/Twitter.svg';
import Website from '../../../assets/Ido/Ido_project_socials/Web.svg';
const Socials = ({
    margin,
    width,
    height,
    medium,
    website,
    telegram,
    twitter,
}) => {
    const params = useParams();
    return (
        <div className='d-flex'>
            <div>
                <a
                    className={margin}
                    href={website}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        className='cursor-pointer social-links'
                        src={Website}
                        alt='website'
                        width={width}
                        height={height}
                    />
                </a>
            </div>
            <div>
                <a
                    className={margin}
                    href={medium}
                    target='_blank'
                    rel='noreferrer'
                >
                    {params.name === 'lyzi' ? (
                        <RxDiscordLogo
                            size={27}
                            color='#5e0ee2'
                            className='cursor-pointer social-links p-1 border-15 bg-white'
                        />
                    ) : (
                        <img
                            className='cursor-pointer social-links'
                            src={Medium}
                            alt='medium'
                            width={width}
                            height={height}
                        />
                    )}
                </a>
            </div>
            <div>
                <a
                    className={margin}
                    href={telegram}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        className='cursor-pointer social-links'
                        src={Telegram}
                        alt='telegram'
                        width={width}
                        height={height}
                    />
                </a>
            </div>
            <div>
                <a
                    className={margin}
                    href={twitter}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        className='cursor-pointer social-links'
                        src={Twitter}
                        alt='twitter'
                        width={width}
                        height={height}
                    />
                </a>
            </div>
        </div>
    );
};

Socials.propTypes = {
    margin: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    telegram: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default Socials;
