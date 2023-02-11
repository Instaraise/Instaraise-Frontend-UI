import dark_mode_docs_img from '../../../assets/images/dark_mode_docs_img.svg';
import dark_mode_github_img from '../../../assets/images/dark_mode_github_img.svg';
import GithubImg from '../../../assets/images/GithubImg.svg';
import shareDocs from '../../../assets/images/shareDocs.svg';
export const HEADER_DATA = [
    {
        id: 1,
        headerNav: 'Products',
        LinkTo: 'section-2',
    },
    {
        id: 2,
        headerNav: 'Partners',
        LinkTo: 'section-3',
    },
    {
        id: 3,
        headerNav: 'News',
        LinkTo: 'section-5',
    },
    {
        id: 4,
        headerNav: 'Fundraise',
        LinkTo: '/launchpad/create-crowdsale',
    },
];
export const HEADER_SOCIAL_IMAGE = [
    {
        id: 1,
        ShareImg: GithubImg,
        linkTo: `https://github.com/Instaraise/Instaraise-Launchpad-UI`,
    },
    {
        id: 2,
        ShareImg: shareDocs,
        linkTo: `https://docs.instaraise.io/`,
    },
];
export const HEADER_SOCIAL_IMAGE2 = [
    {
        id: 1,
        ShareImg: dark_mode_github_img,
        linkTo: `https://github.com/Instaraise/Instaraise-Launchpad-UI`,
    },
    {
        id: 2,
        ShareImg: dark_mode_docs_img,
        linkTo: `https://docs.instaraise.io/`,
    },
];
