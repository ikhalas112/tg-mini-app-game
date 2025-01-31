import { useContext } from "react";
import { GameContext } from "./game-context";

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context)
    throw new Error("useGameContext context must be use inside GameProvider");

  return context;
};
