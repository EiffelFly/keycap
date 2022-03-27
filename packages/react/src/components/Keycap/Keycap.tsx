import { FC, memo } from "react";
import { specialKeyDisplayName } from "../../services/Utils";
import cn from "clsx";
import "./Keycap.css";
import { useRenderCounter } from "../../hooks/useRenderCounter";

export interface KeycapProps {
  keycap: string;
  isTarget: boolean;
}

export const Keycap: FC<KeycapProps> = memo(({ keycap, isTarget }) => {
  const displayName = keycap.match(/{*.}/)
    ? specialKeyDisplayName[keycap]
    : keycap;
  const renderCounter = useRenderCounter();

  return (
    <button
      className={cn(
        keycap.match(/{*.}/) ? "keycap-special-key" : "keycap-standard-key",
        { "target-keycap": isTarget }
      )}
    >
      {displayName}
      {renderCounter}
    </button>
  );
});

Keycap.displayName = "Keycap";
