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
import useWalletBalance from "./hooks/use-wallet-balance";
import { useActiveAccount } from "thirdweb/react";
import useClaimDailyLogin from "./hooks/use-claim-daily-login";

export default function App() {
  const {
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useGameContext();

  const tgWebApp: WebApp = useWebApp();

  const { claimDailyLogin, isClaiming } = useClaimDailyLogin();

  const [initDataUnsafe, initData] = useInitData();

  const { session } = useAuthContext();

  const { connectWallet, isConnecting } = useConnectWallet();
  const { pay, isPaying } = usePay();
  const account = useActiveAccount();

  const getTokenBalance = useWalletBalance();

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
    }
  }, [initData, initDataUnsafe, isLoaded, sendMessage]);

  const handleIsConnectedReq = useCallback(() => {
    console.log("handleIsConnectedReq");
    if (!session) {
      throw new Error("Not connected");
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
            throw new Error("Payment in progress");
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
    (async () => {
      if (isClaiming) {
        throw new Error("Claiming in progress");
      }

      await claimDailyLogin();
      sendMessage(MethodName.ClaimDailyLogInRes, "success");
    })();
  }, [claimDailyLogin, isClaiming, sendMessage]);

  const handleGetTokenBalaceReq = useCallback(() => {
    if (isLoaded && account?.address) {
      getTokenBalance(account.address);
    }
  }, [account?.address, getTokenBalance, isLoaded]);

  useEffect(() => {
    addEventListener(EventName.ConnectWalletReq, handleConnectWalletReq);
    addEventListener(EventName.GetProfileReq, handleGetProfileReq);
    addEventListener(EventName.IsConnectedReq, handleIsConnectedReq);
    addEventListener(EventName.PayReq, handlePayReq);
    addEventListener(EventName.ShareGameReq, handleShareGameReq);
    addEventListener(EventName.FollowBotReq, handleFollowBotReq);
    addEventListener(EventName.ClaimDailyLogInReq, handleClaimDailyLogInReq);
    addEventListener(EventName.GetTokenBalaceReq, handleGetTokenBalaceReq);

    return () => {
      removeEventListener(EventName.ConnectWalletReq, handleConnectWalletReq);
      removeEventListener(EventName.GetProfileReq, handleGetProfileReq);
      removeEventListener(EventName.IsConnectedReq, handleIsConnectedReq);
      removeEventListener(EventName.PayReq, handlePayReq);
      removeEventListener(EventName.ShareGameReq, handleShareGameReq);
      removeEventListener(EventName.FollowBotReq, handleFollowBotReq);
      removeEventListener(
        EventName.ClaimDailyLogInReq,
        handleClaimDailyLogInReq
      );
      removeEventListener(EventName.GetTokenBalaceReq, handleGetTokenBalaceReq);
    };
  }, [
    addEventListener,
    handleConnectWalletReq,
    handleGetProfileReq,
    removeEventListener,
    handleIsConnectedReq,
    handlePayReq,
    handleShareGameReq,
    handleFollowBotReq,
    handleClaimDailyLogInReq,
    handleGetTokenBalaceReq,
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
