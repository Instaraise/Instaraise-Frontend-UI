import React from 'react';
import CompLogo from '../../../assets/images/CompLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import darkModeImg from '../../../assets/images/darkModeImg.svg';
import GithubImg from '../../../assets/images/GithubImg.svg';
import docsImg from '../../../assets/images/docsImg.svg';
import '../../../scss/_header.css';
const Header = () => {
    return (
        <header className="headerSection">
            <nav class="container-fluid w-100 my-4 navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                    <img className="ml-1" src={CompLogo} />
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
                    <ul class="navbar-nav">
                        <li class="nav-item pl-4">
                            <a class="nav-link" href="#">
                                <span>Services</span>{' '}
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item pl-4">
                            <a class="nav-link" href="#">
                                <span>Roadmap</span>{' '}
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item pl-4">
                            <a class="nav-link" href="#">
                                <span>Partner</span>{' '}
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item pl-4">
                            <a class="nav-link" href="#">
                                <span>News</span>{' '}
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>
                    <div className="ml-auto headerIcons">
                        <img src={darkModeImg} />
                        <img src={GithubImg} />
                        <img src={docsImg} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
