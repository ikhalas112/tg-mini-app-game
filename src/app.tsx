import { Unity } from "react-unity-webgl";
import { useCallback, useEffect } from "react";
import { EventName } from "./types/event";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { MethodName } from "./types/method";
import { useInitData, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useAuthContext } from "./auth/hooks";
import { useGameContext } from "./game-context/use-game-provider";
import useConnectWallet from "./hooks/use-connect-wallet";
import usePay from "./hooks/use-pay";
import { CurrencyType } from "./types/currency";
import { WebApp } from "./types/telegram";

import { BOT_URL, MINI_APP_URL } from "./config-global";
// import DevBox from "./components/dev-box";

export default function App() {
  const {
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useGameContext();

  const tgWebApp: WebApp = useWebApp();

  const [initDataUnsafe, initData] = useInitData();

  const { session } = useAuthContext();

  const { connectWallet, isConnecting } = useConnectWallet();
  const { pay, isPaying } = usePay();

  const handleConnectWalletReq = useCallback(() => {
    if (!isConnecting) {
      connectWallet();
    }
  }, [connectWallet, isConnecting]);

  const handleGetProfileReq = useCallback(() => {
    console.log("handleGetProfileReq");
    console.log("tgQuery :", initData);
    console.log(initDataUnsafe);
    if (initData && isLoaded) {
      sendMessage(MethodName.GetProfileRes, initData);
    } else {
      alert("Telegram not connected");
    }
  }, [initData, initDataUnsafe, isLoaded, sendMessage]);

  const handleIsConnectedReq = useCallback(() => {
    console.log("handleIsConnectedReq");
    if (!session) {
      alert("Not connected");
      return;
    }
    if (isLoaded) {
      sendMessage(MethodName.IsConnectedRes, `Connected: ${session}`);
    }
  }, [sendMessage, isLoaded, session]);

  const handlePayReq = useCallback(
    (...parameters: ReactUnityEventParameter[]) => {
      (async () => {
        try {
          if (isPaying) {
            alert("Payment in progress");
            return;
          }

          console.log("handlePayReq");
          console.log(parameters);
          const itemId = parameters[0] as string;
          const currencyType = parameters[1] as CurrencyType;

          console.log({ itemId, currencyType });
          await pay(itemId, currencyType);
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [isPaying, pay]
  );

  const handleShareGameReq = useCallback(() => {
    const text = "Play this game";
    const url = MINI_APP_URL;
    tgWebApp.openLink(`https://t.me/share/url?url=${url}&text=${text}`);
    sendMessage(MethodName.ShareGameRes, "success");
  }, [sendMessage, tgWebApp]);

  const handleFollowBotReq = useCallback(() => {
    tgWebApp.openLink(BOT_URL);
    sendMessage(MethodName.FollowBotRes, "success");
  }, [sendMessage, tgWebApp]);

  const handleClaimDailyLogInReq = useCallback(() => {
    sendMessage(MethodName.ClaimDailyLogInRes, "success");
  }, [sendMessage]);

  useEffect(() => {
    addEventListener(EventName.ConnectWalletReq, handleConnectWalletReq);
    // addEventListener(EventName.GetWalletAddressReq, handleGetWalletAddressReq);
    addEventListener(EventName.GetProfileReq, handleGetProfileReq);
    addEventListener(EventName.IsConnectedReq, handleIsConnectedReq);
    addEventListener(EventName.PayReq, handlePayReq);
    addEventListener(EventName.ShareGameReq, handleShareGameReq);
    addEventListener(EventName.FollowBotReq, handleFollowBotReq);
    addEventListener(EventName.ClaimDailyLogInReq, handleClaimDailyLogInReq);

    return () => {
      removeEventListener(EventName.ConnectWalletReq, handleConnectWalletReq);
      // removeEventListener(
      //   EventName.GetWalletAddressReq,
      //   handleGetWalletAddressReq
      // );
      removeEventListener(EventName.GetProfileReq, handleGetProfileReq);
      removeEventListener(EventName.IsConnectedReq, handleIsConnectedReq);
      removeEventListener(EventName.PayReq, handlePayReq);
      removeEventListener(EventName.ShareGameReq, handleShareGameReq);
      removeEventListener(EventName.FollowBotReq, handleFollowBotReq);
      removeEventListener(
        EventName.ClaimDailyLogInReq,
        handleClaimDailyLogInReq
      );
    };
  }, [
    addEventListener,
    handleConnectWalletReq,
    handleGetProfileReq,
    // handleGetWalletAddressReq,
    removeEventListener,
    handleIsConnectedReq,
    handlePayReq,
    handleShareGameReq,
    handleFollowBotReq,
    handleClaimDailyLogInReq,
  ]);

  // ----------------------------------------------------------------------------------------------

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ width: "100vw", height: "200vh" }}
    />
  );

  // return (
  //   <div
  //     style={{
  //       paddingBottom: "50vh",
  //       position: "relative",
  //       display: "flex",
  //       flexDirection: "column",
  //     }}
  //   >
  //     <Unity
  //       unityProvider={unityProvider}
  //       style={{ width: "80vw", height: "200vh" }}
  //     />

  //     <DevBox />
  //   </div>
  // );
}
