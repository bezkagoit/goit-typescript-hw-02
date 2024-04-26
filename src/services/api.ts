import axios from "axios";
import { Photo } from "../components/App/App.types";

const ACCESS_KEY = `c8AHaKitHxn6z8PmoDAc0iar57A2CzZ4g2g7W_3Vhng`;

interface apiResponse {
  results: Photo[];
}

export const requestImagesByQuery = async ({
  query,
  page = 1,
  perPage,
}: {
  query: string;
  page?: number;
  perPage?: number;
}): Promise<Photo[]> => {
  const { data } = await axios.get<apiResponse>(
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
