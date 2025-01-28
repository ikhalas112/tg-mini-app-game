import "./index.css";

import { createRoot } from "react-dom/client";

import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { AuthProvider } from "./auth/context";
import App from "./app";

import GameProvider from "./game-context/game-provider";
import { ThirdwebProvider } from "thirdweb/react";
import { DEV_TOOLS_ENABLED } from "./config-global";

if (DEV_TOOLS_ENABLED) {
  import("eruda").then((eruda) => eruda.default.init());
}

createRoot(document.getElementById("root")!).render(
  <WebAppProvider>
    <ThirdwebProvider>
      <GameProvider gameObjectName="GameController">
        <AuthProvider>
          <App />
        </AuthProvider>
      </GameProvider>
    </ThirdwebProvider>
  </WebAppProvider>
);
