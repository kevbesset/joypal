import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Pals from "./pages/Pals";
import LiveTranslation from "./pages/Pals/LiveTranslation";
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
    ],
  },
  {
    path: "/store",
    element: <App />,
    children: [
      {
        index: true,
        element: <Store />,
      },
    ],
  },
  {
    path: "/scenario",
    element: <App />,
    children: [
      {
        index: true,
        element: <Scenario />,
      },
    ],
  },
  {
    path: "/settings",
    element: <App />,
    children: [
      {
        index: true,
        element: <Setting />,
      },
    ],
  },
  {
    path: "/pals",
    element: <App />,
    children: [
      {
        index: true,
        element: <Pals />,
      },
      {
        path: "live-translation",
        element: <LiveTranslation />,
      },
    ],
  },
  {
    path: "/demo",
    element: <Demo />,
  },
]);

export default router;
