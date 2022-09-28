import GithubImg from '../../../assets/images/GithubImg.svg';
import shareDocs from '../../../assets/images/shareDocs.svg';
import dark_mode_github_img from '../../../assets/images/dark_mode_github_img.svg';
import dark_mode_docs_img from '../../../assets/images/dark_mode_docs_img.svg';
export const HEADER_DATA = [
    {
        id: 1,
        headerNav: 'Services',
        LinkTo: 'section-2',
    },
    {
        id: 2,
        headerNav: 'Roadmap',
    },
    {
        id: 3,
        headerNav: 'Partner',
        LinkTo: 'section-3',
    },
    {
        id: 4,
        headerNav: 'News',
        LinkTo: 'section-5',
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
