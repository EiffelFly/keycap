import { KeyBindInfo } from "./type/general";
import {
  chromeDefaultKeyBind,
  chromeDefaultKeyBindNestedList,
} from "./default-key-bind/chrome";

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

type functionKeySet =
  | "Option"
  | "Meta"
  | "Control"
  | "Meta+Option"
  | "Meta+Shift"
  | "Mata+Shift+Option";

export const findKeyBindsWithFunctionKeySet = (
  key: functionKeySet,
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
  key: functionKeySet,
  os: OS
): Result<KeyBindInfo[]> => {
  switch (os) {
    case "mac": {
      const targetList = chromeDefaultKeyBindNestedList[key];
      if (typeof targetList !== "undefined") {
        return { status: "success", value: targetList };
      } else {
        return {
          status: "error",
          error: new Error("Key not found, you may have wrong function key"),
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
