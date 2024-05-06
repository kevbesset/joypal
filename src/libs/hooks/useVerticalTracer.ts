import { MutableRefObject, useEffect, useState } from "react";

export default function useVerticalTracer(
  trackRef: MutableRefObject<HTMLElement | null>,
  trackSelector: string,
  offset = 0
) {
  const [styles, setStyles] = useState({
    transform: `translate3d(0, ${offset}px, 0)`,
  });

  const observer = new MutationObserver(refresh);

  function refresh() {
    if (trackRef?.current) {
      const activeEl = trackRef?.current.querySelector(
        `.${trackSelector}`
      ) as HTMLElement;

      if (activeEl) {
        setStyles({
          transform: `translate3d(0, ${activeEl.offsetTop + offset}px, 0)`,
        });
      }
    }
  }

  useEffect(() => {
    if (trackRef.current) {
      observer.observe(trackRef.current, {
        childList: true,
      });
      window.addEventListener("resize", refresh);
      refresh();
    }
    return () => window.removeEventListener("resize", refresh);
  }, []);

  return {
    styles,
    refresh,
  };
}
