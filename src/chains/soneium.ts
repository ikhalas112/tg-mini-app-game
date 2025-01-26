import { defineChain } from "thirdweb";

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
  testnet: true,
});
