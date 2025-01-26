export type ProductItem = {
  products: {
    ProductID: string;
    EndDate: string | null;
    Info: ProductInfo;
    FormattedEndDate: string;
  }[];
};

export type ProductInfo = {
  _id: string;
  product_id: string;
  base_price_in_usd: number;
  image_url: string;
  price_in_axd_token_in_msf6: number;
  prices: ProductPrices;
  on_chain_prices: ProductOnChainPrices;
  created_at: string;
};

export type ProductPrices = {
  kaia: string;
  usd: string;
  thb: string;
  krw: string;
  jpy: string;
  twd: string;
  tg_star: string;
};

export type ProductOnChainPrices = Record<`0x${string}`, string>;
