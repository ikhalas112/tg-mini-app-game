import { useCallback } from "react";

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

  console.log({ activeAccount });
  console.log({ activeWallet });

  const connectWallet = useCallback(() => {
    (async () => {
      try {
        if (activeAccount && activeWallet) {
          alert("Wallet already connected");
          return;
        }
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
        console.log(walletConnect);
        if (!walletConnect.success) {
          throw new Error("Wallet connection failed");
        }

        sendMessage(MethodName.ConnectWalletRes, account.address);
      } catch (error) {
        // error handling
        console.log({ activeWallet });
        if (activeWallet) {
          disconnect(activeWallet);
        }
        console.error(error);
      } finally {
        connecting.onFalse();
      }
    })();
  }, [
    activeAccount,
    connect,
    connecting,
    disconnect,
    sendMessage,
    activeWallet,
  ]);

  return { connectWallet, isConnecting: connecting.value };
}
