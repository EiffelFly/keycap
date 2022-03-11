import { KeyBindInfo } from "../dist/cjs/type/general";
import { chromeDefaultKeyBind } from "./default-key-bind/chrome";

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
