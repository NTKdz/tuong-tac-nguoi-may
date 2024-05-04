import axios from "axios";
import { useDispatch } from "react-redux";
import { NewsResult } from "../interface/newsInterface";
import {
  setLatestNews,
  setNewsDetail,
  setTrendingNews,
} from "../slices/newsSlice";
import { setLoading } from "../slices/loadingSlice";

const baseUrl = "https://www.newsapi.ai/api/v1/article/getArticles";
export default function NewsHooks() {
  const dispatch = useDispatch();

  async function getLatestNews() {
    const query = {
      query: {
        $query: {
          locationUri: "http://en.wikipedia.org/wiki/United_States",
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
          locationUri: "http://en.wikipedia.org/wiki/United_States",
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
        console.log(data.articles.results[0]);
        dispatch(setNewsDetail(data.articles.results[0]));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getNewsBySearch(
    location: string,
    date: string,
    category: string,
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
              locationUri: "http://en.wikipedia.org/wiki/United_States",
            },
            {
              dateStart: "2024-04-27",
              dateEnd: "2024-05-04",
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
  }

  return { getNewsBySearch, getNewsDetail, getTrendingNews, getLatestNews };
}
