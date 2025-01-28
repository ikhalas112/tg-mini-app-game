import { getChain } from "../chains";
import { ASTR_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "../config-global";
import { useGameContext } from "../game-context/use-game-provider";
import { MethodName } from "../types/method";
import { client } from "../utils/third-web";
import { getWalletBalance } from "thirdweb/wallets";

export default function useWalletBalance() {
  const { sendMessage } = useGameContext();

  const getBalanceOnChain = async (
    walletAddress: string,
    tokenAddress?: string
  ) => {
    const balance = await getWalletBalance({
      address: walletAddress,
      client: client,
      chain: getChain(),
      tokenAddress: tokenAddress,
    });
    console.log(balance);
    return balance.displayValue;
  };

  const getBalance = async (walletAddress: string) => {
    if (!walletAddress) {
      throw new Error("Wallet address is required");
    }

    console.log({ ASTR_CONTRACT_ADDRESS });
    console.log({ USDT_CONTRACT_ADDRESS });

    const tokens = ["", ASTR_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS];
    const balance = await Promise.all(
      tokens.map((token) => getBalanceOnChain(walletAddress, token))
    );
    console.log(balance.join("||"));
    sendMessage(MethodName.GetTokenBalaceRes, balance.join("||"));
    return balance;
  };

  return getBalance;
}
