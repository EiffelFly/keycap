import { FC } from "react";
import { getKeyboardLayout } from "../services/KeyboardLayout";
import "./css/Keyboard.css";

export interface KeyboardProps {}

const Keyboard: FC<KeyboardProps> = () => {
  return (
    <div className="keycap-keyboard-container">
      {getKeyboardLayout().default.map((row, index) => (
        <div className="keycap-keyboard-row" key={`keycap-row-${index}`}>
          {row.split(" ").map((keycap) => {
            return (
              <div
                className={
                  keycap.match(/{*.}/)
                    ? "keycap-special-key"
                    : "keycap-standard-key"
                }
              >
                {keycap}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
