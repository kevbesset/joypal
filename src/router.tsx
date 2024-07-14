import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Store from "./pages/Store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "c/:channelId",
        element: <Dashboard />,
      },
      {
        path: "store",
        element: <Store />,
      },
    ],
  },
]);

export default router;
