import { Modifiers, OS } from "./type/general";

/**
 * This function will get KeybordEvent's modifiers, with order below
 * Meta -> Shift -> Alt | Option -> Ctrl
 *
 * @param e KeyboardEvent
 * @returns
 */

export const getEventModifiers = (e: KeyboardEvent, os: OS): Modifiers[] => {
  let modifiers: Modifiers[] = [];

  if (e.metaKey) {
    modifiers.push("Meta");
  }

  if (e.shiftKey) {
    modifiers.push("Shift");
  }

  if (e.altKey) {
    modifiers.push(os === "mac" ? "Option" : "Alt");
  }

  if (e.ctrlKey) {
    modifiers.push("Ctrl");
  }

  return modifiers;
};

export const modifiers = ["Meta", "Shift", "Option", "Alt", "Ctrl"];

export const isCompleteKeybind = (e: KeyboardEvent, os: OS): boolean => {
  const currentModifiers = getEventModifiers(e, os);
  if (currentModifiers.length === 0) {
    return false;
  }

  // If the current key is modifiers, that is not a set of complete keybind

  if (modifiers.includes(e.key)) {
    return false;
  }

  return true;
};

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
