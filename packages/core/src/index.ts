import { KeyBindInfo } from "./type/general";
import {
  chromeDefaultKeyBind,
  chromeDefaultKeyBindNestedList,
} from "./default-key-bind/chrome";

export * from "./type/general";

type Browser = "chrome" | "webkit" | "firefox";
type OS = "windows" | "mac" | "linux";

type ResultSuccess<T> = { status: "success"; value: T };

type ResultError = { status: "error"; error: Error };

type Result<T> = ResultSuccess<T> | ResultError;

export const lookupKeyBind = (key: string, browser: Browser, os: OS) => {
  switch (browser) {
    case "chrome": {
      return lookupChromeKeyBind(key, os);
    }
    default:
      return "";
      break;
  }
};

const lookupChromeKeyBind = (key: string, os: OS): Result<KeyBindInfo> => {
  switch (os) {
    case "mac": {
      const keyBind = chromeDefaultKeyBind[key];
      if (typeof keyBind !== "undefined") {
        return { status: "success", value: keyBind };
      } else {
        return {
          status: "error",
          error: new Error("Key not found, you may have wrong key"),
        };
      }
    }
    default: {
      return {
        status: "error",
        error: new Error(
          "OS not found, Keycap now only support major os system included Mac, Windows and Linux"
        ),
      };
    }
  }
};

/**
 *
 *
 */

export type FunctionKeySet =
  | "Option"
  | "Meta"
  | "Control"
  | "Meta+Option"
  | "Meta+Shift"
  | "Mata+Shift+Option";

export const findKeyBindsWithFunctionKeySet = (
  key: FunctionKeySet,
  os: OS,
  browser: Browser
): Result<KeyBindInfo[]> => {
  switch (browser) {
    case "chrome": {
      return findChormeKeyBinds(key, os);
    }
    default:
      return {
        status: "error",
        error: new Error(
          "Browser not found, Keycap now only support major os browser included Chrom, Webkit and Firefox"
        ),
      };
  }
};

const findChormeKeyBinds = (
  key: FunctionKeySet,
  os: OS
): Result<KeyBindInfo[]> => {
  switch (os) {
    case "mac": {
      try {
        const targetList = chromeDefaultKeyBindNestedList[key];
        if (typeof targetList !== "undefined") {
          return { status: "success", value: targetList };
        } else {
          return {
            status: "error",
            error: new Error("Key not found, you may have wrong function key"),
          };
        }
      } catch (err) {
        return {
          status: "error",
          error: new Error(
            `Something went wrong when access chrome keybinds -> ${err}`
          ),
        };
      }
    }

    default:
      return {
        status: "error",
        error: new Error(
          "OS not found, Keycap now only support major os system included Mac, Windows and Linux"
        ),
      };
  }
};

export type Modifiers = "shift" | "alt" | "ctrl" | "meta";

export const getEventModifiers = (e: KeyboardEvent): Modifiers[] => {
  let modifiers: Modifiers[] = [];

  if (e.shiftKey) {
    modifiers.push("shift");
  }

  if (e.altKey) {
    modifiers.push("alt");
  }

  if (e.ctrlKey) {
    modifiers.push("ctrl");
  }

  if (e.metaKey) {
    modifiers.push("meta");
  }

  return modifiers;
};

export const FUNCTION_KEY = [
  "ContextMenu",
  "Alt",
  "Meta",
  "Control",
  "CapsLock",
  "Shift",
  "Tab",
  "Escape",
  "Esc",
  "Backspace",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
  "Space",
  "Delete",
  "End",
  "Help",
  "Home",
  "Insert",
  "PageDown",
  "PageUp",
  "PrintScreen",
  "ScrollLock",
  "Pause",
];

export const NUMPAD_KEY = [
  "NumLock",
  "Numpad0",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "NumpadAdd",
  "NumpadComma",
  "NumpadDecimal",
  "NumpadDivide",
  "NumpadEnter",
  "NumpadEqual",
  "NumpadMultiply",
  "NumpadSubtract",
];

export const NON_ALPHABET_KEY = [
  "Comma",
  "Period",
  "Semicolon",
  "Quote",
  "BracketLeft",
  "BracketRight",
  "Backquote",
  "Backslash",
  "Minus",
  "Equal",
  "IntlRo",
  "IntlYen",
];

export const ALPHABET_KEY = [
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "KeyA",
  "KeyB",
  "KeyC",
  "KeyD",
  "KeyE",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyM",
  "KeyN",
  "KeyO",
  "KeyP",
  "KeyQ",
  "KeyR",
  "KeyS",
  "KeyT",
  "KeyU",
  "KeyV",
  "KeyW",
  "KeyX",
  "KeyY",
  "KeyZ",
];

export const getMatchedKeys = (os: OS, browser: Browser, key: string) => {
  switch (os) {
    case "linux": {
      getLinuxKeys(browser, key);
      break;
    }
    case "mac": {
      const keys = getMacKeys(browser, key);
      console.log(keys);
      break;
    }
    case "windows": {
      getWindowsKeys(browser, key);
      break;
    }
    default: {
      throw new Error(
        `Keycap now only support Linux, Mac and Windows, you could submit issue to support - ${os}`
      );
    }
  }
};

const getLinuxKeys = (browser: Browser, key: string) => {
  switch (browser) {
    case "chrome": {
      getChromeKeys(key);
      break;
    }
    case "firefox": {
      getFirefoxKeys(key);
      break;
    }
    case "webkit": {
      getWebkitKeys(key);
      break;
    }
  }
};

const getMacKeys = (browser: Browser, key: string) => {
  switch (browser) {
    case "chrome": {
      getChromeKeys(key);
      break;
    }
    case "firefox": {
      getFirefoxKeys(key);
      break;
    }
    case "webkit": {
      getWebkitKeys(key);
      break;
    }
  }
};

const getWindowsKeys = (browser: Browser, key: string) => {
  switch (browser) {
    case "chrome": {
      getChromeKeys(key);
      break;
    }
    case "firefox": {
      getFirefoxKeys(key);
      break;
    }
    case "webkit": {
      getWebkitKeys(key);
      break;
    }
  }
};

const getChromeKeys = (key: string) => {
  try {
    const keys = chromeDefaultKeyBindNestedList[key];
    return keys;
  } catch (err) {
    console.log(err);
    throw new Error(
      `Something when wrong when try to get chrome default keybind - ${err}`
    );
  }
};

const getFirefoxKeys = (key: string) => {
  console.log(key);
};

const getWebkitKeys = (key: string) => {
  console.log(key);
};
