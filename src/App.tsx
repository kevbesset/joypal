import bem from "react-bemthis";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";
import useTheme from "./libs/hooks/useTheme";

const { block } = bem(styles);

export default function App() {
  useTheme();

  return (
    <div className={block()}>
      {/* <Toolbar /> */}
      <Outlet />
      <ToastContainer />
    </div>
  );
}
