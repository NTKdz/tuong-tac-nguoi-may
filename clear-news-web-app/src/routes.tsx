import { createBrowserRouter } from "react-router-dom";
import LayOut from "./pages/LayOut";
import ErrorPage from "./error-pages";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import NewsList from "./pages/news-list/NewsList";
import SearchPage from "./pages/searchpage/SearchPage";
import NewsDetail from "./pages/news-detail/NewsDetail";
import Account from "./pages/account/Account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search/:keyword", element: <SearchPage /> },
      { path: "/login", element: <Login /> },
      { path: "/category/:category", element: <NewsList /> },
      { path: "/:id", element: <NewsDetail /> },
      { path: "/account/:route", element: <Account /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
