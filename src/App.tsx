import bem from "react-bemthis";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Toolbar from "./components/layouts/Toolbar";

const { block } = bem(styles);

export default function App() {
  return (
    <div className={block()}>
      <Toolbar />
      <Outlet />
    </div>
  );
}
