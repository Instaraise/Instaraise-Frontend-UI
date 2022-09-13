import React from 'react';
import { HEADER_DATA } from '../../../../config/HomeConfig/HeaderConfig/config.header';
import instaLogo from '../../../../assets/images/InstaLogo.svg';
import CompName from '../../../../assets/images/Instaraise.svg';
import darkModeImg from '../../../../assets/images/darkModeImg.svg';
import GithubImg from '../../../../assets/images/GithubImg.svg';
import shareDocs from '../../../../assets/images/shareDocs.svg';
const Header = () => {
    return (
        <header className="homepage-navbar ">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div className="container my-4">
                    <a class="navbar-brand" href="#">
                        <img className="compLogo" src={instaLogo} />
                        <img className="ml-2" src={CompName} />
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-menu-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-hdd-stack-fill"
                                viewBox="0 0 16 16"
                            >
                                {' '}
                                <path d="M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"></path>{' '}
                            </svg>
                        </span>
                    </button>

                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <div className="homepage-navbar-menu mx-auto">
                            <ul class="navbar-nav mt-2">
                                {HEADER_DATA.map((elem) => (
                                    <li class="nav-item px-2">
                                        <a class="nav-link text-end" href="#">
                                            <span>{elem.headerNav}</span>{' '}
                                            <span class="sr-only">
                                                (current)
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="homepage-navbar-social ml-auto text-end">
                            <img src={darkModeImg} />
                            <img src={GithubImg} />
                            <img src={shareDocs} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
{
    /* <header className="headerSection">
            <nav class="container my-4 navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand ml-1" href="#">
                    <img className="compLogo" src={compLogo} />
                    <img className="ml-3" src={CompName} />
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mx-auto">
                        {HEADER_DATA.map((elem) => (
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <span>{elem.headerNav}</span>{' '}
                                    <span class="sr-only">(current)</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="ml-auto headerIcons">
                        <img src={darkModeImg} />
                        <img src={GithubImg} />
                        <img src={shareDocs} />
                    </div>
                </div>
            </nav>
        </header> */
}
