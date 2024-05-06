import { MutableRefObject, useEffect, useState } from "react";

export default function useTracer(
  trackRef: MutableRefObject<HTMLElement | null>,
  trackSelector: string
) {
  const [styles, setStyles] = useState({
    transform: `translate3d(0px, 0, 0)`,
    width: `0px`,
  });

  const observer = new MutationObserver(refresh);

  function refresh() {
    if (trackRef?.current) {
      const activeEl = trackRef?.current.querySelector(
        `.${trackSelector}`
      ) as HTMLElement;

      if (activeEl) {
        setStyles({
          transform: `translate3d(${activeEl.offsetLeft}px, 0, 0)`,
          width: `${activeEl.offsetWidth}px`,
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
