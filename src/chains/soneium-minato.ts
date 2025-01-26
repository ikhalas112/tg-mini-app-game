import { defineChain } from "thirdweb";

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
