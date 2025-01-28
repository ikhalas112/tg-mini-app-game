import { useCallback, useEffect } from "react";

import axios from "../utils/axios";
import { IssueNonce } from "../types/auth";
import { client as twClient } from "../utils/third-web";
import { Response } from "../types/common";

import { useBoolean } from "../utils/hooks/use-boolean";
import { MethodName } from "../types/method";
import { useGameContext } from "../game-context/use-game-provider";
import { getChain } from "../chains";
import {
  useActiveAccount,
  useConnectModal,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export default function useConnectWallet() {
  const activeAccount = useActiveAccount();
  const { connect } = useConnectModal();
  const connecting = useBoolean(false);
  const { disconnect } = useDisconnect();
  const activeWallet = useActiveWallet();
  const { sendMessage } = useGameContext();
  const error = useBoolean(false);

  // console.log({ activeAccount });
  // console.log({ activeWallet });

  useEffect(() => {
    if (activeWallet && error.value) {
      console.log("disconnecting wallet");
      disconnect(activeWallet);
      error.onFalse();
    }
  }, [activeWallet, disconnect, error, error.value]);

  const connectWallet = useCallback(() => {
    (async () => {
      try {
        if (activeAccount && activeWallet) {
          alert("Wallet already connected");
          return;
        }
        console.log("start connecting wallet");
        connecting.onTrue();

        const wallet = await connect({
          client: twClient,
          wallets: [
            createWallet("io.metamask"),
            createWallet("com.okex.wallet"),
            inAppWallet({
              auth: {
                options: ["email"],
              },
            }),
          ],
          chain: getChain(),
          showAllWallets: false,
          size: "compact",
        });

        const account = wallet.getAccount();

        if (!account) {
          return;
        }

        const { data: issue } = await axios.post<Response<IssueNonce>>(
          "/api/v1/auth/wallet/connect/issue-signing-message",
          {
            walletAddress: account.address,
          }
        );
        console.log(issue);

        if (!issue.success) {
          throw new Error(issue.errors);
        }
        const { nonce, messageToBeSigned } = issue.data;
        console.log({ nonce, messageToBeSigned });

        const signature = await account.signMessage({
          message: messageToBeSigned,
        });
        console.log({ signature });
        const { data: walletConnect } = await axios.post<Response>(
          "/api/v1/auth/wallet/connect",
          {
            walletAddress: account.address,
            signedMessage: signature,
          }
        );
        console.log({ "/wallet/connect": walletConnect });
        if (!walletConnect.success) {
          throw new Error("Wallet connection failed");
        }

        console.log("connected wallet");
        sendMessage(MethodName.ConnectWalletRes, account.address);
      } catch (e: any) {
        error.onTrue();
        console.log(e);
        console.error(e?.message);
        console.error(e?.code);
        console.log(e?.statusCode);
        if (e?.statusCode === 2013) {
          sendMessage(MethodName.ConnectWalletRes, "invalidWallet");
          return;
        } else if (e?.code === 5000) {
          sendMessage(MethodName.ConnectWalletRes, "rejectwallet");
        } else {
          sendMessage(MethodName.ConnectWalletRes, "interrupt");
        }
      } finally {
        connecting.onFalse();
      }
    })();
  }, [activeAccount, activeWallet, connecting, connect, sendMessage, error]);

  return { connectWallet, isConnecting: connecting.value };
}
