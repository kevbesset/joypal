import bem from "react-bemthis";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";

const { block } = bem(styles);

export default function App() {
  return (
    <div className={block()}>
      {/* <Toolbar /> */}
      <Outlet />
      <ToastContainer />
    </div>
  );
}
