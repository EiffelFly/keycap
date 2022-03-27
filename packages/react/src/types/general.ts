import { KeyBindInfo } from "@keycap/core";

export type UseKeycapResult = {
  key: KeyboardEvent | null;
  keybinds: KeyBindInfo[] | [];
};
