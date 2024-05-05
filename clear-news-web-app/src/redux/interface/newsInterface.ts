export interface NewsState {
  newsDetail: NewsDetail;
  latestNews: NewsResult;
  trendingNews: NewsResult;
}

export interface NewsDetail {
  uri: string;
  lang: string;
  isDuplicate: boolean;
  date: string;
  time: string;
  dateTime: string;
  dateTimePub: string;
  dataType: string;
  sim: number;
  url: string;
  title: string;
  body: string;
  source: {
    uri: string;
    dataType: string;
    title: string;
  };
  authors: string[];
  concepts: {
    uri: string;
    type: string;
    score: number;
    label: {
      eng: string;
    };
  }[];
  categories: {
    uri: string;
    label: string;
    wgt: number;
  }[];
  videos: {
    uri: string;
    label: string;
  }[];
  image: string;
  location: {
    type: string;
    label: {
      eng: string;
    };
    country: {
      type: string;
      label: {
        eng: string;
      };
    };
  };
  shares: {
    sentiment: number;
    wgt: number;
    relevance: number;
  };
}

export interface NewsResult {
  articles: {
    results: NewsDetail[];
    totalResults: number;
    page: number;
    count: number;
    pages: number;
  };
}
