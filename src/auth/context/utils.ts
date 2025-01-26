import axios from "../../utils/axios";
import { SESSION_TOKEN_KEY } from "../config";

export const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem(SESSION_TOKEN_KEY, token);
    axios.defaults.headers.common["x-session-token"] = token;
  } else {
    localStorage.removeItem(SESSION_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};
