import { useCallback } from "react";
import { paymentProcessorContract } from "../contracts";

import axios from "../utils/axios";
import { useAuthContext } from "../auth/hooks";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { WebApp } from "../types/telegram";
import { readContract } from "thirdweb";
import useConnectWallet from "../hooks/use-connect-wallet";
import useWalletBalance from "../hooks/use-wallet-balance";
import { useActiveAccount } from "thirdweb/react";
import useClaimDailyLogin from "../hooks/use-claim-daily-login";

export default function DevBox() {
  const { logout, session } = useAuthContext();
  const tgWebApp: WebApp = useWebApp();
  const { connectWallet } = useConnectWallet();
  const getBalance = useWalletBalance();
  const account = useActiveAccount();
  const { claimDailyLogin } = useClaimDailyLogin();

  // const handleGetPaymentReq = useCallback(
  //   (...parameters: ReactUnityEventParameter[]) => {
  //     (async () => {
  //       console.log("handleGetPaymentReq");
  //       const orederId = parameters[0] as string;
  //       console.log({ orederId });

  //       try {
  //         if (!account) {
  //           alert("Wallet not connected");
  //           return;
  //         }

  //         const payment = await readContract({
  //           contract: paymentProcessorContract,
  //           method: "getPayment",
  //           params: ["6790cff52dfb9b2fe318f552"],
  //         });
  //         console.log({ payment });
  //         // sendMessage(MethodName.GetPaymentRes, JSON.stringify(payment));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   },
  //   [account]
  // );

  // const handleGetTokenBalaceReq = useCallback(
  //   (...parameters: ReactUnityEventParameter[]) => {
  //     (async () => {
  //       console.log(parameters);
  //       // const tokenAddress = parameters[0] as string;
  //       // const walletAddress = parameters[1] as string;

  //       const tokenAddress = "0xbBeEDcD5479cB885463905cb1b41eaa5dc8131fd";
  //       const walletAddress = "0x2aaA638A1b01D0F4632824F31cC8c81505E4259A";

  //       console.log("handleGetTokenBalaceReq", tokenAddress, walletAddress);

  //       const balance = await getWalletBalance({
  //         address: walletAddress,
  //         client: twClient,
  //         chain: getChain(),
  //         tokenAddress: tokenAddress,
  //       });
  //       console.log({ balance });
  //       sendMessage(
  //         MethodName.GetTokenBalaceRes,
  //         `${balance.displayValue} ${balance.symbol}`
  //       );
  //     })();
  //   },
  //   [sendMessage]
  // );

  // const handleGetStarBalaceReq = useCallback(
  //   (...parameters: ReactUnityEventParameter[]) => {
  //     (async () => {
  //       try {
  //         const userID = parameters[0];
  //         console.log("handleGetStarBalaceReq", userID);
  //         // const initDataParsed = new URLSearchParams(initData);
  //       } catch (error) {
  //         console.error("Error fetching user star balance:", error);
  //         throw error;
  //       }
  //     })();
  //   },
  //   []
  // );

  const getProductsApi = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/social-fi/iap/products");
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const purchaseProductApi = useCallback(async () => {
    try {
      const body = {
        product_id: "starter_package",
        token_contract_address: "0xbbeedcd5479cb885463905cb1b41eaa5dc8131fd",
      };

      const { data } = await axios.post(
        "/api/v1/social-fi/dapp/telegram/purchase/on-chain",
        body
      );
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOrderOnChainApi = useCallback(async () => {
    try {
      const orderId = "679092eb0c914799278fda46";
      const { data } = await axios.get(
        `/api/v1/social-fi/dapp/telegram/purchase/on-chain/${orderId}`
      );
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const readGetPaymentOnChain = async () => {
    const payment = await readContract({
      contract: paymentProcessorContract,
      method: "getPayment",
      params: ["6790cff52dfb9b2fe318f552"],
    });

    console.log({ payment });
  };

  const readGetPaymentsOnChain = async () => {
    const payments = await readContract({
      contract: paymentProcessorContract,
      method: "getPayments",
      params: [["6790cff52dfb9b2fe318f552"]],
    });

    console.log({ payments });
  };

  const handleClick = () => {
    console.log(tgWebApp);
    console.log(window.location.href);
    const text = "";
    const url = "https://t.me/rca22567_bot/appdemodev2";
    tgWebApp.openLink(`https://t.me/share/url?url=${url}&text=${text}`, {
      try_instant_view: true,
    });
  };

  return (
    <>
      {!!session && (
        <div
          style={{
            position: "fixed",
            right: 0,
            top: "30%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <button onClick={connectWallet}>Connect Wallet</button>
          <button onClick={() => getBalance(account?.address || "")}>
            Get Balance
          </button>

          <button onClick={claimDailyLogin}>Claim Daily Login</button>

          <button onClick={getProductsApi}>Get Products API</button>

          <button onClick={purchaseProductApi}>Purchase API</button>

          <button onClick={getOrderOnChainApi}>Get Order API</button>

          <button onClick={readGetPaymentOnChain}>Get Payment Contract</button>

          <button onClick={readGetPaymentsOnChain}>
            Get Payments Contract
          </button>

          <button onClick={handleClick}>Share</button>

          <hr />

          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}
