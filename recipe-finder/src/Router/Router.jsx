import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import SearchPage from "../Pages/SearchPage";
import RecipeDetail from "../Pages/RecipeDetail";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",         
        element: <SearchPage />
      },
      {
        path: "search", 
        element: <SearchPage />
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />
      }
    ]
  }
]);

export default Router;
