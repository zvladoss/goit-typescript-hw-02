import axios from "axios";
import { UnsplashImage } from "../../types";

const API_KEY = "U2sUQWLDlbRAPe2hqY8Qdh-SHwRVNbdwy2ZZXuE7Ktg";

interface ApiResponse {
  results: UnsplashImage[];
}

export const fetchImages = async (
  query: string,
  page: number,
  options?: { signal?: AbortSignal }
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: API_KEY,
        query,
        page,
        per_page: 12,
      },
      signal: options?.signal,
    }
  );

  return response.data;
};
