import { useMemo, useState, useEffect, useCallback } from "react";
import { Response } from "../../types/common";
import { Login } from "../../types/auth";
import { AuthContext } from "./auth-context";

import axios from "../../utils/axios";
import { useBoolean } from "../../utils/hooks/use-boolean";
// import { SESSION_TOKEN_KEY } from "../config";
import { setSession } from "./utils";
// import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useGameContext } from "../../game-context/use-game-provider";
import { MethodName } from "../../types/method";
import {
  useActiveAccount,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const { sendMessage, isLoaded } = useGameContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, initData] = useInitData();

  // const initData =
  //   "user=%7B%22id%22%3A6528425453%2C%22first_name%22%3A%22_%22%2C%22last_name%22%3A%22Klass%22%2C%22username%22%3A%22ikhalas112%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVF9BqnfWBbvl6KriJ5-8yPJ0x-3sKJfhtbLnIE-pssC5yqINjXZsFtllRkbl4Vcm.svg%22%7D&chat_instance=-879308954631743954&chat_type=channel&auth_date=1737899584&signature=1AQUTsxH3n6Kkjk-HBzY4PBn2QPHLhOtO-isl7zV9gnBVA_tV60TLSIF_2MT-oAbDThlf8hV3jkWNLVqr6NKDw&hash=3a3e6db421965bc0673bdad267f5dbd82ac5aba2485de1234c782021c9d16a64";

  const [sesstionToken, setSesstionToken] = useState<string | null>(null);
  const loading = useBoolean(true);

  const initialize = useCallback(async () => {
    try {
      if (initData) {
        const { data: login } = await axios.post<Response<Login>>(
          "/api/v1/auth/login/telegram",
          {
            authDataPayload: initData,
          }
        );

        // console.log({ login });

        setSesstionToken(login.data.sessionToken);
        setSession(login.data.sessionToken);
      }
    } catch (error) {
      if (account && wallet) {
        disconnect(wallet);
      }
      setSesstionToken(null);
      setSession(null);
      console.log(error);
    } finally {
      loading.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, disconnect, initData, wallet]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const getSession = () => {
      sendMessage(MethodName.SaveSessionToken, `TELEGRAM||${sesstionToken}`);
    };
    if (isLoaded && sesstionToken) {
      getSession();
    }
  }, [isLoaded, sendMessage, sesstionToken]);

  const logout = useCallback(() => {
    if (account && wallet) {
      disconnect(wallet);
    }
    setSesstionToken(null);
    setSession(null);
    alert("You have been logged out");
  }, [account, disconnect, wallet]);

  const checkAuthenticated = sesstionToken
    ? "authenticated"
    : "unauthenticated";

  const status = loading.value ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      session: sesstionToken,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      logout,
    }),
    [status, sesstionToken, logout]
  );

  if (!initData) {
    return <p>Telegram not connected</p>;
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
