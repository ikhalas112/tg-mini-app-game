import { createThirdwebClient } from "thirdweb";
import { THIRDWEB_CLIENT_ID } from "../config-global";

export const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});
