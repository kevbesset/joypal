import bem from "react-bemthis";
import Logo from "../Logo/Logo";
import Nav from "../Nav";
import Settings from "../Settings";
import styles from "./Toolbar.module.scss";

const { block, element } = bem(styles);

export default function Toolbar() {
  return (
    <aside className={block()}>
      <div className={element("header")}>
        <Logo />
      </div>
      <Nav />
      <Settings />
    </aside>
  );
}
