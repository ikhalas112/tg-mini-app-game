import { useUnityContext } from "react-unity-webgl";
import { GameContext } from "./game-context";
import { useCallback } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";

type Props = {
  children: React.ReactNode;
  gameObjectName: string;
};

export default function GameProvider({ children, gameObjectName }: Props) {
  const unityContext = useUnityContext({
    // loaderUrl: "/assets/unity/v1/WebBuilder_Test_Telegram.loader.js",
    // dataUrl: "/assets/unity/v1/WebBuilder_Test_Telegram.data.unityweb",
    // frameworkUrl:
    //   "/assets/unity/v1/WebBuilder_Test_Telegram.framework.js.unityweb",
    // codeUrl: "/assets/unity/v1/WebBuilder_Test_Telegram.wasm.unityweb",

    loaderUrl: "/assets/unity/v2/AX_T_28_DEV.loader.js",
    dataUrl: "/assets/unity/v2/AX_T_28_DEV.data.unityweb",
    frameworkUrl: "/assets/unity/v2/AX_T_28_DEV.framework.js.unityweb",
    codeUrl: "/assets/unity/v2/AX_T_28_DEV.wasm.unityweb",
  });

  const sendMessage = useCallback(
    (methodName: string, ...parameters: ReactUnityEventParameter[]) => {
      unityContext.sendMessage(gameObjectName, methodName, ...parameters);
    },
    [gameObjectName, unityContext]
  );

  return (
    <GameContext.Provider value={{ ...unityContext, sendMessage }}>
      {children}
    </GameContext.Provider>
  );
}
