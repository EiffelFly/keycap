export interface KeyBindInfo {
  id: string;
  name: string;
  platform: "mac" | "window" | "linux";
  browser: "chrome" | "webkit" | "firefox";
  capturable: boolean;
  /** If the keybind will only be valid under specific condition.
   * For example, if the keybind don't make visual change but it still triggered, then
   * the keybind doesn't count as conditional. Like Meta+2, when there has
   * no second tab, this key will still be triggered but without action, this
   * key doesn't count as conditional.
   */
  conditional: boolean;
  condition?: string;
  type: "browserDefault" | "userDefined" | "appPreset";
}

export interface BrowserKeybindSet {
  mac: { [key: string]: KeyBindInfo };
  chrome: { [key: string]: KeyBindInfo };
  linux: { [key: string]: KeyBindInfo };
}

export type FunctionKeySet =
  | "Option"
  | "Meta"
  | "Control"
  | "Meta+Option"
  | "Meta+Shift"
  | "Mata+Shift+Option";

export type Browser = "chrome" | "webkit" | "firefox";

export type OS = "windows" | "mac" | "linux";

export type Modifiers = "Shift" | "Alt" | "Option" | "Ctrl" | "Meta";

type ResultSuccess<T> = {
  status: "success" | "notFound";
  value: T;
  error: null;
};

type ResultError = { status: "error"; value: null; error: Error };

export type Result<T> = ResultSuccess<T> | ResultError;
