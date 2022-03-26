import {
  chromeDefaultKeyBind,
  chromeDefaultKeyBindNestedList,
} from "./default-key-bind/chrome";
import { Browser, KeyBindInfo, OS, Result } from "./type/general";
import { getEventModifiers, isCompleteKeybind } from "./utils";

export * from "./type/general";

// const lookupChromeKeyBind = (key: string, os: OS): Result<KeyBindInfo> => {
//   switch (os) {
//     case "mac": {
//       const keyBind = chromeDefaultKeyBind[key];
//       if (typeof keyBind !== "undefined") {
//         return { status: "success", value: keyBind };
//       } else {
//         return {
//           status: "error",
//           error: new Error("Key not found, you may have wrong key"),
//         };
//       }
//     }
//     default: {
//       return {
//         status: "error",
//         error: new Error(
//           "OS not found, Keycap now only support major os system included Mac, Windows and Linux"
//         ),
//       };
//     }
//   }
// };

// const findKeyBindsWithFunctionKeySet = (
//   key: FunctionKeySet,
//   os: OS,
//   browser: Browser
// ): Result<KeyBindInfo[]> => {
//   switch (browser) {
//     case "chrome": {
//       return findChormeKeyBinds(key, os);
//     }
//     default:
//       return {
//         status: "error",
//         error: new Error(
//           "Browser not found, Keycap now only support major os browser included Chrom, Webkit and Firefox"
//         ),
//       };
//   }
// };

// const findChormeKeyBinds = (
//   key: FunctionKeySet,
//   os: OS
// ): Result<KeyBindInfo[]> => {
//   switch (os) {
//     case "mac": {
//       try {
//         const targetList = chromeDefaultKeyBindNestedList[key];
//         if (typeof targetList !== "undefined") {
//           return { status: "success", value: targetList };
//         } else {
//           return {
//             status: "error",
//             error: new Error("Key not found, you may have wrong function key"),
//           };
//         }
//       } catch (err) {
//         return {
//           status: "error",
//           error: new Error(
//             `Something went wrong when access chrome keybinds -> ${err}`
//           ),
//         };
//       }
//     }

//     default:
//       return {
//         status: "error",
//         error: new Error(
//           "OS not found, Keycap now only support major os system included Mac, Windows and Linux"
//         ),
//       };
//   }
// };

const getMatchedKeys = (
  os: OS,
  browser: Browser,
  event: KeyboardEvent
): Result<KeyBindInfo | KeyBindInfo[] | []> => {
  const modifiers = getEventModifiers(event, os);

  switch (browser) {
    // case "linux": {.
    //   getLinuxKeys(browser, key);
    //   break;
    // }
    case "chrome": {
      if (isCompleteKeybind(event, os)) {
        const key = modifiers.join("+") + "+" + event.key;

        console.log(key);

        return getChromeKeybind(key, os);
      }

      const key = modifiers.join("+");

      return getChromeKeybindsByModifiers(os, key);
    }
    // case "windows": {
    //   getWindowsKeys(browser, key);
    //   break;
    // }
    default: {
      throw new Error(
        `Keycap now only support Linux, Mac and Windows, you could submit issue to support - ${os}`
      );
    }
  }
};

const getChromeKeybindsByModifiers = (
  os: OS,
  key: string
): Result<KeyBindInfo[] | []> => {
  try {
    const browserSpecificKeybinds = chromeDefaultKeyBindNestedList[os];

    if (typeof browserSpecificKeybinds === "undefined") {
      return {
        status: "error",
        value: [],
        error: new Error(
          `Keycap now only support Linux, Mac and Windows, you could submit issue to support - ${os}`
        ),
      };
    }

    let keybinds = browserSpecificKeybinds[key];

    if (typeof keybinds === "undefined") {
      keybinds = [];
    }

    return {
      status: "success",
      value: keybinds,
      error: null,
    };
  } catch (err) {
    console.log(err);
    throw new Error(
      `Something when wrong when try to get chrome's keybinds by key - ${key}: - ${err}`
    );
  }
};

const getChromeKeybind = (key: string, os: OS): Result<KeyBindInfo[] | []> => {
  try {
    const browserSpecificKeybinds = chromeDefaultKeyBind[os];

    if (typeof browserSpecificKeybinds === "undefined") {
      throw new Error(
        `OS: ${os} not found, Keycap now only support major os system included Mac, Windows and Linux`
      );
    }

    let keybind: KeyBindInfo | undefined = browserSpecificKeybinds[key];

    if (typeof keybind === "undefined") {
      return {
        status: "notFound",
        value: [],
        error: null,
      };
    }

    return {
      status: "success",
      value: [keybind],
      error: null,
    };
  } catch (err) {
    console.log(err);
    throw new Error(
      `Something when wrong when try to get chrome's keybinds by key - ${key}: - ${err}`
    );
  }
};

// const getFirefoxKeys = (key: string) => {
//   console.log(key);
// };

// const getWebkitKeys = (key: string) => {
//   console.log(key);
// };

export { getMatchedKeys };
