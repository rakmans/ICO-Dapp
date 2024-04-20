import { createBrowserRouter } from "react-router-dom";
import ICO from "../pages/ICO";
import Main from "../pages/Main";
import Page_404 from "../pages/404/404.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "ICO/:ICOAddress",
    element: <ICO />,
  },
  { path: "*", element: <Page_404 /> }
]);
