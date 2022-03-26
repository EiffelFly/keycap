import { FC, useEffect } from "react";
import { getKeyboardLayout } from "../../services/KeyboardLayout";
import { specialKeyDisplayName } from "../../services/Utils";
import "./Keyboard.css";
import * as classNames from "classnames";
import { getMatchedKeys } from "@keycap/core";

export interface KeyboardProps {}

export const Keyboard: FC<KeyboardProps> = () => {
  // const [currentKeybinds, setCurrentKeybinds] = useState<KeyBindInfo[]>();
  // const [currentFunctionKeySet, setCurrentFunctionKeySet] = useState<string>();
  // const [onCtrl, setOnCtrl] = useState(false);

  const keydownHandler = (e: KeyboardEvent) => {
    console.log("keydown", e);

    const { value } = getMatchedKeys("mac", "chrome", e);

    console.log(value);
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

  return (
    <div className="keycap-keyboard-container">
      {getKeyboardLayout().default.map((row, index) => (
        <div className="keycap-keyboard-row" key={`keycap-row-${index}`}>
          {row.split(" ").map((keycap, index) => {
            const displayName = keycap.match(/{*.}/)
              ? specialKeyDisplayName[keycap]
              : keycap;

            return (
              <button
                className={classNames.default(
                  keycap.match(/{*.}/)
                    ? "keycap-special-key"
                    : "keycap-standard-key"
                )}
                key={`keycap-${keycap}-${index}`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};