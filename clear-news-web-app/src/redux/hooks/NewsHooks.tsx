import axios from "axios";
import { useDispatch } from "react-redux";
import { NewsDetail, NewsResult } from "../interface/newsInterface";
import {
  setLatestNews,
  setNewsByQuery,
  setNewsDetail,
  setTrendingNews,
} from "../slices/newsSlice";
import { setLoading } from "../slices/loadingSlice";

const baseUrl = "https://www.newsapi.ai/api/v1/article/getArticles";
const baseUrl1 = "https://www.newsapi.ai/api/v1/article/getArticle";
export default function NewsHooks() {
  const dispatch = useDispatch();

  async function getLatestNews() {
    const query = {
      query: {
        $query: {
          lang: "eng",
        },
        $filter: {
          forceMaxDataTimeWindow: "31",
          isDuplicate: "skipDuplicates",
        },
      },
      resultType: "articles",
      articlesSortBy: "date",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: "27cdf73d-32ac-4b7d-8663-e05f57049703",
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl, query);

      if (response.status === 200) {
        const data: NewsResult = response.data;
        dispatch(setLatestNews(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getTrendingNews() {
    const query = {
      query: {
        $query: {
          lang: "eng",
        },
        $filter: {
          forceMaxDataTimeWindow: "31",
          isDuplicate: "skipDuplicates",
        },
      },
      resultType: "articles",
      articlesSortBy: "rel",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: "27cdf73d-32ac-4b7d-8663-e05f57049703",
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl, query);

      if (response.status === 200) {
        const data: NewsResult = response.data;
        dispatch(setTrendingNews(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getNewsDetail(id: string) {
    const query = {
      articleUri: [id],
      resultType: "info",
      articlesSortBy: "date",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: "27cdf73d-32ac-4b7d-8663-e05f57049703",
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl1, query);

      if (response.status === 200) {
        const data: NewsDetail = response.data[id].info;
        dispatch(setNewsDetail(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getNewsByCategory(category: string) {
    const query = {
      query: {
        $query: {
          $and: [
            {
              $or: [
                {
                  categoryUri: "dmoz/" + category,
                },
                {
                  categoryUri: "news/" + category,
                },
              ],
            },
            {
              locationUri: "http://en.wikipedia.org/wiki/United_States",
            },
            {
              lang: "eng",
            },
          ],
        },
        $filter: {
          forceMaxDataTimeWindow: "31",
          isDuplicate: "skipDuplicates",
        },
      },
      resultType: "articles",
      articlesSortBy: "date",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: "27cdf73d-32ac-4b7d-8663-e05f57049703",
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl, query);

      if (response.status === 200) {
        const data: NewsResult = response.data;
        console.log(data);
        dispatch(setNewsByQuery(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getNewsBySearch(
    locations: string[],
    date: string,
    categories: string,
    sortBy: string
  ) {
    const query = {
      query: {
        $query: {
          $and: [
            {
              $or: [
                {
                  categoryUri: "dmoz/Science",
                },
                {
                  categoryUri: "news/Science",
                },
              ],
            },
            {
              $or: [
                locations.map((location) => {
                  locationUri: "http://en.wikipedia.org/wiki/" + location;
                }),
                {
                  locationUri: "http://en.wikipedia.org/wiki/United_Kingdom",
                },
                {
                  locationUri: "http://en.wikipedia.org/wiki/United_States",
                },
              ],
            },
            {
              dateStart: "2024-04-29",
              dateEnd: "2024-05-06",
            },
          ],
        },
      },
      resultType: "articles",
      articlesSortBy: "date",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: "27cdf73d-32ac-4b7d-8663-e05f57049703",
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl, query);

      if (response.status === 200) {
        const data: NewsResult = response.data;
        dispatch(setNewsByQuery(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    getNewsBySearch,
    getNewsDetail,
    getTrendingNews,
    getLatestNews,
    getNewsByCategory,
  };
}
