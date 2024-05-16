import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as HTMLElement)
      ) {
        callback();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
}
