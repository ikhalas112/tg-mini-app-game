import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { axdDailyLoginContract } from "../contracts";
import { useBoolean } from "../utils/hooks/use-boolean";

export default function useClaimDailyLogin() {
  const account = useActiveAccount();
  const claimState = useBoolean(false);

  const claimDailyLogin = async () => {
    if (!account) {
      throw new Error("Account is required");
    }

    const transaction = prepareContractCall({
      contract: axdDailyLoginContract,
      method: "claim",
      params: [],
    });

    const receipt = await sendAndConfirmTransaction({
      transaction: transaction,
      account,
    });

    console.log("claim ", receipt);

    return receipt;
  };

  return { claimDailyLogin, isClaiming: claimState.value };
}
