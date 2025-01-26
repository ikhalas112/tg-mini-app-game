import { useBoolean } from "../utils/hooks/use-boolean";

import {
  getTokenContractByCurrencyType,
  paymentProcessorContract,
} from "../contracts";
import { useCallback } from "react";
import axios from "../utils/axios";
import { Response } from "../types/common";
import { ProductItem } from "../types/item";
import { CurrencyType } from "../types/currency";
import { MethodName } from "../types/method";
import { useGameContext } from "../game-context/use-game-provider";
import {
  sendTransaction,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { approve } from "thirdweb/extensions/erc20";
import { useActiveAccount } from "thirdweb/react";

export default function usePay() {
  const account = useActiveAccount();
  const payingState = useBoolean(false);
  const { sendMessage } = useGameContext();

  const approveToken = useCallback(
    async (currencyType: CurrencyType, amount: bigint) => {
      if (!account) {
        throw new Error("Account is required");
      }
      if (currencyType !== "$USDT" && currencyType !== "$ASTR") {
        throw new Error("Invalid currency type");
      }
      const contract = getTokenContractByCurrencyType(currencyType);

      const approveTransaction = approve({
        contract,
        spender: paymentProcessorContract.address,
        amountWei: amount,
      });

      const { transactionHash: approveTxHash } = await sendTransaction({
        transaction: approveTransaction,
        account,
      });
      console.log({ approveTxHash });
      return approveTxHash;
    },
    [account]
  );

  const getItemAmount = useCallback(
    async (itemId: string, tokenAddress: `0x${string}`) => {
      const { data } = await axios.get<Response<ProductItem>>(
        "/api/v1/social-fi/iap/products"
      );

      if (!Array.isArray(data?.data?.products)) {
        throw new Error("Invalid products data");
      }

      console.log(data);
      const item = data?.data?.products?.find(
        (item) => item.ProductID === itemId
      );
      if (!item) {
        throw new Error("Item not found");
      }

      console.log(item?.Info?.on_chain_prices);
      console.log({ tokenAddress });

      if (!item?.Info?.on_chain_prices?.[tokenAddress]) {
        throw new Error("Price not found");
      }
      return BigInt(item.Info.on_chain_prices[tokenAddress]);
    },
    []
  );

  const pay = useCallback(
    async (itemId: string, currencyType: CurrencyType) => {
      try {
        payingState.onTrue();
        if (!itemId) {
          throw new Error("Item is required");
        }
        if (!currencyType) {
          throw new Error("Currency type is required");
        }
        // TODO : consult with the team to get the account
        if (!account) {
          throw new Error("Account is required");
        }

        switch (currencyType) {
          // ---------------------- on chain payment ----------------------
          case "$USDT":
          case "$ASTR": {
            const tokenAddress = getTokenContractByCurrencyType(
              currencyType
            ).address.toLowerCase() as `0x${string}`;

            const amount = await getItemAmount(itemId, tokenAddress);
            const approveTxHash = await approveToken(currencyType, amount);
            console.log({ approveTxHash });

            if (!approveTxHash) {
              throw new Error("Approve transaction failed");
            }

            const { data: onChainOrder } = await axios.post<
              Response<{
                order_id: string;
              }>
            >("/api/v1/social-fi/dapp/telegram/purchase/on-chain", {
              product_id: itemId,
              token_contract_address: tokenAddress,
            });

            console.log({ onChainOrder });

            const orderId = onChainOrder.data.order_id;

            if (!orderId) {
              throw new Error("purchase order failed order id not found");
            }

            const payTransaction = prepareContractCall({
              contract: paymentProcessorContract,
              method: "pay",
              params: [orderId, tokenAddress, amount],
            });

            const payReceipt = await sendAndConfirmTransaction({
              transaction: payTransaction,
              account,
            });
            console.log({ payReceipt });

            if (payReceipt.status !== "success") {
              throw new Error("Pay transaction failed");
            }

            sendMessage(MethodName.PayRes, "success");

            break;
          }

          // ---------------------- off chain payment ----------------------

          case "Stars": {
            const { data: offChainOrder } = await axios.post<Response<any>>(
              "/api/v1/social-fi/dapp/telegram/purchase/off-chain",
              {
                product_id: itemId,
              }
            );
            console.log(offChainOrder);
            if (!offChainOrder.success) {
              throw new Error("purchase order failed");
            }

            sendMessage(MethodName.PayRes, "success");
            break;
          }
          default:
            throw new Error("Invalid currency type");
        }
      } catch (error) {
        console.error(error);
        sendMessage(MethodName.PayRes, "failed");
      } finally {
        payingState.onFalse();
      }
    },
    [account, approveToken, getItemAmount, payingState, sendMessage]
  );

  return { pay, isPaying: payingState.value };
}
