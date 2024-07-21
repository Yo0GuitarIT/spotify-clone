import { createContext } from "react";
import { PlayerContextType } from "../types/types";

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);
