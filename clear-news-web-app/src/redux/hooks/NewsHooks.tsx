/* eslint-disable no-unused-labels */
import axios from "axios";
import { useDispatch } from "react-redux";
import { NewsDetail, NewsResult } from "../interface/newsInterface";
import {
  setLatestNews,
  setNewsByQuery,
  setNewsDetail,
  setTrendingNews,
} from "../slices/newsSlice";
import { setAudioLink, setLoading } from "../slices/loadingSlice";
import { formatDateTime } from "../../utils/dateFormater";
import dayjs from "dayjs";
import { capitalize } from "../../utils/stringFormater";

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
      apiKey: apiKey,
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
      apiKey: apiKey,
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
      apiKey: apiKey,
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl1, query);

      if (response.status === 200) {
        const data: NewsDetail = response.data[id].info;
        console.log(data);
        await getAudio(data.body);
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
      apiKey: apiKey,
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
    date: { startDate: string; endDate: string },
    categories: string[],
    sortBy: string,
    topic: string
  ) {
    console.log([locations, date, categories, sortBy]);
    const parseDate = (dateString: string) => {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    };

    const startDate = date.startDate
      ? parseDate(date.startDate)
      : dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const endDate = date.endDate
      ? parseDate(date.endDate)
      : dayjs().format("YYYY-MM-DD");

    const locationProperty = locations[0] && [
      ...locations.map((location) => ({
        locationUri: `http://en.wikipedia.org/wiki/${location.replace(
          /\s+/g,
          "_"
        )}`,
      })),
    ];

    const categoriesProperty = categories[0] && [
      ...categories.map((category) => ({
        categoryUri: `dmoz/${capitalize(category)}`,
      })),
      ...categories.map((category) => ({
        categoryUri: `news/${capitalize(category)}`,
      })),
    ];
    console.log({ startDate, endDate });

    const query = {
      query: {
        $query: {
          $and: [
            {
              $or: locationProperty
                ? locationProperty
                : [
                    {
                      locationUri: "http://en.wikipedia.org/wiki/United_States",
                    },
                  ],
            },
            {
              $or: categoriesProperty ? categoriesProperty : categoryQuery,
            },
            {
              dateStart: startDate,
              dateEnd: endDate,
            },
            { lang: "eng" },
            topic !== "" && {
              keyword: topic,
              keywordLoc: "title",
            },
          ].filter(Boolean),
        },
        $filter: {
          isDuplicate: "skipDuplicates",
          forceMaxDataTimeWindow: "31",
        },
      },
      resultType: "articles",
      articlesSortBy: sortBy === "date" ? "date" : "rel",
      includeArticleEventUri: false,
      includeArticleCategories: true,
      includeArticleLocation: true,
      includeArticleImage: true,
      includeArticleVideos: true,
      apiKey: apiKey,
    };

    console.log([query]);

    try {
      dispatch(setLoading(true));
      const response = await axios.post(baseUrl, query);

      if (response.status === 200) {
        const data: NewsResult = response.data;
        console.log(response.data);
        dispatch(setNewsByQuery(data));
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getAudio(text: string) {
    dispatch(setLoading(true));
    const key = [
      "8e8798413dmshf57c00d04dfa197p1e8da5jsnaadb5e702399",
      "0917e38b6fmsh25dbcb67d26c191p1e2df3jsnc92302097b33",
      "f6b1f07fbcmshb9a187811f54d80p1a0023jsnb383338ae2de",
    ];

    const options = {
      method: "POST",
      url: "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": key[2],
        "X-RapidAPI-Host": "realistic-text-to-speech.p.rapidapi.com",
      },
      data: {
        voice_obj: {
          id: 2014,
          voice_id: "en-US-Neural2-A",
          gender: "Male",
          language_code: "en-US",
          language_name: "US English",
          voice_name: "John",
          status: 2,
          rank: 0,
          type: "google_tts",
          isPlaying: false,
        },
        json_data: [
          {
            block_index: 0,
            text: text,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);

      if (response.status === 200) {
        const data: {
          link: string;
          block_index: number;
          duration: number;
          size: number;
        }[] = response.data;
        console.log(data);
        dispatch(setAudioLink(data[0].link));
      }
    } catch (error) {
      console.error(error);
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
const categoryQuery = [
  {
    categoryUri: "dmoz/Arts",
  },
  {
    categoryUri: "dmoz/Business",
  },
  {
    categoryUri: "dmoz/Computers",
  },
  {
    categoryUri: "dmoz/Health",
  },
  {
    categoryUri: "dmoz/Home",
  },
  {
    categoryUri: "dmoz/Science",
  },
  {
    categoryUri: "dmoz/Sports",
  },
  {
    categoryUri: "dmoz/Games",
  },
  {
    categoryUri: "news/Arts",
  },
  {
    categoryUri: "news/Business",
  },
  {
    categoryUri: "news/Computers",
  },
  {
    categoryUri: "news/Health",
  },
  {
    categoryUri: "news/Home",
  },
  {
    categoryUri: "news/Science",
  },
  {
    categoryUri: "news/Sports",
  },
  {
    categoryUri: "news/Games",
  },
];

const apiKey = "159c60f5-3163-4a6c-a5e7-ceba43588b89";
const apiKey1 = "80e6dfda-35b9-4e5c-9a4d-80a83b945586";
