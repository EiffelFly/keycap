import { chromeDefaultKeyBindNestedList } from "./default-key-bind/chrome";
import { Browser, KeyBindInfo, OS, Result } from "./type/general";

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
  key: string
): Result<KeyBindInfo[]> => {
  switch (os) {
    // case "linux": {
    //   getLinuxKeys(browser, key);
    //   break;
    // }
    case "mac": {
      return getMacKeys(browser, key);
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

// const getLinuxKeys = (browser: Browser, key: string): Result<KeyBindInfo[]> => {
//   switch (browser) {
//     case "chrome": {
//       return {
//         status: "success",
//         value: getChromeKeys(key),
//       };
//     }
//     default: {
//       return {
//         status: "error",
//         error: new Error(
//           `Browser ${browser} not found, Keycap now only support major os browser included Chrom, Webkit and Firefox`
//         ),
//       };
//     }
//     // case "firefox": {
//     //   return {
//     //     status: "success",
//     //     value: getFirefoxKeys(key),
//     //   };
//     // }
//     // case "webkit": {
//     //   getWebkitKeys(key);
//     //   break;
//     // }
//   }
// };

const getMacKeys = (browser: Browser, key: string): Result<KeyBindInfo[]> => {
  switch (browser) {
    case "chrome": {
      return {
        status: "success",
        value: getChromeKeys(key),
      };
    }
    default: {
      return {
        status: "error",
        error: new Error(
          `Browser ${browser} not found, Keycap now only support major os browser included Chrom, Webkit and Firefox`
        ),
      };
    }
    // case "firefox": {
    //   getFirefoxKeys(key);
    //   break;
    // }
    // case "webkit": {
    //   getWebkitKeys(key);
    //   break;
    // }
  }
};

// const getWindowsKeys = (
//   browser: Browser,
//   key: string
// ): Result<KeyBindInfo[]> => {
//   switch (browser) {
//     case "chrome": {
//       return {
//         status: "success",
//         value: getChromeKeys(key),
//       };
//     }
//     default: {
//       return {
//         status: "error",
//         error: new Error(
//           `Browser ${browser} not found, Keycap now only support major os browser included Chrom, Webkit and Firefox`
//         ),
//       };
//     }
//     // case "firefox": {
//     //   getFirefoxKeys(key);
//     //   break;
//     // }
//     // case "webkit": {
//     //   getWebkitKeys(key);
//     //   break;
//     // }
//   }
// };

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

// const getFirefoxKeys = (key: string) => {
//   console.log(key);
// };

// const getWebkitKeys = (key: string) => {
//   console.log(key);
// };

export { getMatchedKeys };
