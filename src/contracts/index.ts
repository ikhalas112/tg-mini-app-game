import { getContract } from "thirdweb";
import {
  ASTR_CONTRACT_ADDRESS,
  AXD_DAILY_LOGIN_CONTRACT_ADDRESS,
  PAYMENT_PROCESSOR_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "../config-global";
import { paymentProcessorAbi } from "../assets/abi/payment-processor.abi";
import { client } from "../utils/third-web";
import { CurrencyType } from "../types/currency";
import { getChain } from "../chains";

export const paymentProcessorContract = getContract({
  address: PAYMENT_PROCESSOR_CONTRACT_ADDRESS,
  chain: getChain(),
  client,
  abi: paymentProcessorAbi,
});

export const axdDailyLoginContract = getContract({
  address: AXD_DAILY_LOGIN_CONTRACT_ADDRESS,
  chain: getChain(),
  client,
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "DailyLoginClaimed",
      type: "event",
    },
    {
      inputs: [],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const usdtContract = getContract({
  address: USDT_CONTRACT_ADDRESS,
  chain: getChain(),
  client,
});

export const astrContract = getContract({
  address: ASTR_CONTRACT_ADDRESS,
  chain: getChain(),
  client,
});

export const getTokenContractByCurrencyType = (currencyType: CurrencyType) => {
  if (currencyType === "$USDT") {
    return usdtContract;
  }
  if (currencyType === "$ASTR") {
    return astrContract;
  }
  throw new Error("Invalid currency type");
};
