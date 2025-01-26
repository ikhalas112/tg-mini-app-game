import { defineChain } from "thirdweb";
import { CHAIN_ID } from "../config-global";

/**
 * @chain
 */
export const soneiumMinato = /* @__PURE__ */ defineChain({
  id: 1946,
  name: "Soneium Minato",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorers: [
    {
      name: "Minato Minato Explorer",
      url: "https://soneium-minato.blockscout.com/",
    },
  ],
  testnet: true,
});

/**
 * @chain
 */
export const soneium = /* @__PURE__ */ defineChain({
  id: 1868,
  name: "Soneium",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorers: [
    {
      name: "Minato Explorer",
      url: "https://soneium.blockscout.com/",
    },
  ],
});

export const getChain = () => {
  if (!CHAIN_ID) {
    throw new Error("CHAIN_ID is not defined");
  }

  switch (Number(CHAIN_ID)) {
    case 1868:
      return soneium;
    case 1946:
      return soneiumMinato;
    default:
      throw new Error(`Chain with ID ${CHAIN_ID} is not supported`);
  }
};
