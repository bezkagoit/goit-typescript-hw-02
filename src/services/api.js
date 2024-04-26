import axios from "axios";

const ACCESS_KEY = `c8AHaKitHxn6z8PmoDAc0iar57A2CzZ4g2g7W_3Vhng`;

export const requestImagesByQuery = async (query, page = 1, perPage) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}`,
    {
      params: {
        query: query,
        page: page,
        per_page: perPage,
      },
    }
  );
  return data.results;
};
