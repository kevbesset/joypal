import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Pals from "./pages/Pals";
import LiveTranslation from "./pages/Pals/LiveTranslation";
import Scenario from "./pages/Scenario";
import Setting from "./pages/Setting";
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
      {
        path: "pals/live-translation",
        element: <LiveTranslation />,
      },
    ],
  },
]);

export default router;
