import { createBrowserRouter } from "react-router-dom";
import LayOut from "./pages/LayOut";
import ErrorPage from "./error-pages";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [{ path: "/", element: <HomePage /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
