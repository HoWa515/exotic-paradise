import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenCapturing); // true:event handled in capturing

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler]
  );
  return ref;
}
