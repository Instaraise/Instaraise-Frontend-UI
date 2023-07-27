import axios from 'axios';

import { MEDIUM_API_URL } from '../../config/config';
/* eslint-disable no-unreachable */
export const fetchAllTrendingNews = async () => {
    try {
        const response = await axios.get(MEDIUM_API_URL);
        const formattedData = response.data.items
            .map((elem, index) => {
                const contentWithoutImage = elem.content.replace(
                    /<figure>.*<\/figure>|<img[^>]*>/g,
                    ''
                );
                const lines = contentWithoutImage.split('\n');
                const content = lines.slice(0, 3).join('\n');
                return {
                    id: index,
                    title: elem.title,
                    description: elem.description,
                    content: content,
                    image_url: elem.thumbnail,
                    link: elem.link,
                    date: elem.pubDate,
                    categories: elem.categories,
                };
            })
            .slice(0, 4);
        return {
            status: true,
            data: formattedData,
        };
    } catch (error) {
        return {
            status: false,
            data: [],
        };
    }
};
