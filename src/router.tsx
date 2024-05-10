import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Store from "./pages/Store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  {
    path: "/demo",
    element: <Demo />,
  },
]);

export default router;
