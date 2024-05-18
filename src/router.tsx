import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Pals from "./pages/Pals";
import Scenario from "./pages/Scenario";
import Setting from "./pages/Setting";
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
      {
        path: "scenario",
        element: <Scenario />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
      {
        path: "pals",
        element: <Pals />,
      },
    ],
  },
  {
    path: "/demo",
    element: <Demo />,
  },
]);

export default router;
