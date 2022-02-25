import { FC, useEffect } from "react";
import { getKeyboardLayout } from "../services/KeyboardLayout";
import { specialKeyDisplayName } from "../services/Utils";
import "./css/Keyboard.css";

export interface KeyboardProps {}

const Keyboard: FC<KeyboardProps> = () => {
  const keydownHandler = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === "n" && e.metaKey) {
      console.log(e)
      e.preventDefault();
      e.stopPropagation();
      alert("captured");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler, false);
    return;
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
                className={
                  keycap.match(/{*.}/)
                    ? "keycap-special-key"
                    : "keycap-standard-key"
                }
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

export default Keyboard;
