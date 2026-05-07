import { useEffect } from "react";

export function useKeys(keyPressed, callback) {
  useEffect(
    function () {
      if (!keyPressed) return;
      function exeFunction(event) {
        if (event.key === keyPressed) {
          callback();
        }
      }
      document.addEventListener("keydown", exeFunction);

      return () => {
        document.removeEventListener("keydown", exeFunction);
      };
    },
    [callback, keyPressed],
  );
}
