import useTheme from "@/libs/hooks/useTheme";
import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef } from "react";
import bem from "react-bemthis";
import Icon from "../Icon";
import styles from "./ThemeSwitcher.module.scss";

const { block, element } = bem(styles);

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string
  );

  function handleClick() {
    toggleTheme();
  }

  useEffect(() => {
    refresh();
  }, [theme]);

  return (
    <div className={block()} onClick={handleClick}>
      <div className={element("tracer")} style={styles}></div>
      <div ref={listRef} className={element("list")}>
        <div className={element("item", { active: theme === "dark" })}>
          <Icon name="dark_mode" fill className={element("icon")} />
        </div>
        <div className={element("item", { active: theme !== "dark" })}>
          <Icon name="light_mode" className={element("icon")} />
        </div>
      </div>
    </div>
  );
}
