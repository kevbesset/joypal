import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef, useState } from "react";
import bem from "react-bemthis";
import Icon from "../Icon";
import styles from "./ThemeSwitcher.module.scss";

const { block, element } = bem(styles);

type Theme = "dark" | "light";

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<Theme>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string
  );

  function applyTheme(theme: Theme) {
    document.body.classList[theme === "dark" ? "add" : "remove"]("dark");
  }

  function handleClick() {
    setActiveTheme(activeTheme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    applyTheme(activeTheme);
    refresh();
  }, [activeTheme]);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newTheme = event.matches ? "dark" : "light";
        setActiveTheme(newTheme);
        applyTheme(newTheme);
      });

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", (event) => {
          const newTheme = event.matches ? "dark" : "light";
          setActiveTheme(newTheme);
          applyTheme(newTheme);
        });
    };
  });

  return (
    <div className={block()} onClick={handleClick}>
      <div className={element("tracer")} style={styles}></div>
      <div ref={listRef} className={element("list")}>
        <div className={element("item", { active: activeTheme === "dark" })}>
          <Icon name="dark_mode" fill className={element("icon")} />
        </div>
        <div className={element("item", { active: activeTheme !== "dark" })}>
          <Icon name="light_mode" className={element("icon")} />
        </div>
      </div>
    </div>
  );
}
