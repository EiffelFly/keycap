import { Browser, getMatchedKeys, OS } from "@keycap/core";
import { useEffect, useState } from "react";
import { UseKeycapResult } from "../types/general";

export const useKeycap = (browser: Browser, os: OS): UseKeycapResult => {
  const [useKeycapResult, setUseKeycapResult] = useState<UseKeycapResult>({
    key: null,
    keybinds: [],
  });

  console.log("render");

  const keydownHandler = (e: KeyboardEvent) => {
    console.log("keydown", e);
    const { value } = getMatchedKeys(os, browser, e);

    if (e.repeat) {
      return;
    }

    setUseKeycapResult({
      key: e,
      keybinds: value,
    });
  };

  const keyupHandler = () => {
    console.log("keyup");
    setUseKeycapResult({
      key: null,
      keybinds: [],
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler, false);
    document.addEventListener("keyup", keyupHandler, false);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return useKeycapResult;
};
