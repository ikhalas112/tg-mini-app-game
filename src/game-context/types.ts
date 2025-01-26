import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";

export type GameContextType = Omit<UnityContextHook, "sendMessage"> & {
  sendMessage: (
    methodName: string,
    ...parameters: ReactUnityEventParameter[]
  ) => void;
};
