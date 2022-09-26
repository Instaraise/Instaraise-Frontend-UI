import axios from "axios";

const API_URL = "https://blog.instaraise.io/wp-json/wp/v2/posts";
/* eslint-disable no-unreachable */
export const fetchAllTrendingNews = async () => {
  try {
    const response = await axios.get(API_URL);
    const formattedData = response.data.map((elem) => {
      return {
        id: elem.id,
        title: elem.title.rendered,
        excerpt: elem.excerpt.rendered,
        content: elem.content.rendered,
        image_url: elem.yoast_head_json.og_image[0].url,
        link: elem.link,
        date: elem.date,
      };
    });
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
