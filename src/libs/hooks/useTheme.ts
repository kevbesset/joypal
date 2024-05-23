import { useEffect, useState } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

function getCurrentTheme(): Theme {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  function apply(theme: Theme) {
    setTheme(theme);
    document.body.classList[theme === Theme.DARK ? "add" : "remove"](
      Theme.DARK
    );
  }

  function toggleTheme() {
    apply(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  }

  useEffect(() => {
    apply(theme);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newTheme = event.matches ? Theme.DARK : Theme.LIGHT;
        apply(newTheme);
      });

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", (event) => {
          const newTheme = event.matches ? Theme.DARK : Theme.LIGHT;
          apply(newTheme);
        });
    };
  });

  return {
    theme,
    toggleTheme,
  };
}
