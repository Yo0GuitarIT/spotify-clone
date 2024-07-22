import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { PlayerContextType } from "../types/types";

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
};
