import { FC } from "react";
import { getKeyboardLayout } from "../../services/KeyboardLayout";
import "./Keyboard.css";
import { useKeycap } from "../../hooks/useKeycap";
import { Keycap } from "../Keycap";

export interface KeyboardProps {}

export const Keyboard: FC<KeyboardProps> = () => {
  const { keybinds } = useKeycap("chrome", "mac");

  console.log(keybinds);

  return (
    <div className="keycap-keyboard-container">
      {getKeyboardLayout().default.map((row, index) => (
        <div className="keycap-keyboard-row" key={`keycap-row-${index}`}>
          {row.split(" ").map((keycap, index) => {
            const targetIdx = keybinds.findIndex((e) => e.id.includes(keycap));
            return (
              <Keycap
                key={`keycap-${keycap}-${index}`}
                isTarget={targetIdx === -1 ? false : true}
                keycap={keycap}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
