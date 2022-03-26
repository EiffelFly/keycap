import { Browser, getMatchedKeys, KeyBindInfo, OS } from "@keycap/core";
import { useEffect, useState } from "react";

export const useKeycap = (browser: Browser, os: OS) => {
  const [currentKeybinds, setCurrentKeybinds] = useState<
    KeyBindInfo[] | KeyBindInfo | []
  >([]);

  const keydownHandler = (e: KeyboardEvent) => {
    console.log("keydown", e);

    const { value } = getMatchedKeys(os, browser, e);

    setCurrentKeybinds(value);
  };

  const keyupHandler = (e: KeyboardEvent) => {
    console.log("keyup", e);
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler, false);
    document.addEventListener("keyup", keyupHandler, false);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return {
    keybinds: currentKeybinds,
  };
};
