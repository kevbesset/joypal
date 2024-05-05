import bem from "react-bemthis";
import Logo from "../Logo/Logo";
import styles from "./Toolbar.module.scss";

const { block, element } = bem(styles);

export default function Toolbar() {
  return (
    <aside className={block()}>
      <div className={element("header")}>
        <Logo />
      </div>
      <nav className={element("nav")}></nav>
      <div className={element("settings")}></div>
    </aside>
  );
}
