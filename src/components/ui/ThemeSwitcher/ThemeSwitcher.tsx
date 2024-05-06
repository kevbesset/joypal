import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef, useState } from "react";
import bem from "react-bemthis";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./ThemeSwitcher.module.scss";

const { block, element } = bem(styles);

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("dark");
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string
  );

  useEffect(() => {
    refresh();
  }, [activeTheme]);

  return (
    <div className={block()}>
      <div className={element("tracer")} style={styles}></div>
      <div ref={listRef} className={element("list")}>
        <Button
          icon
          className={element("item", { active: activeTheme === "dark" })}
          onClick={() => setActiveTheme("dark")}
        >
          <Icon name="dark_mode" fill className={element("icon")} />
        </Button>
        <Button
          icon
          className={element("item", { active: activeTheme !== "dark" })}
          onClick={() => setActiveTheme("light")}
        >
          <Icon name="light_mode" className={element("icon")} />
        </Button>
      </div>
    </div>
  );
}
