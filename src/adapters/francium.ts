import { Connection, PublicKey } from "@solana/web3.js";
import TOKENS from "../tokens.json";
import { AssetRate, ProtocolRates } from "../types";
import FranciumSDK from "francium-sdk";

export async function fetch() {
  const RPC_NODE = "https://api.mainnet-beta.solana.com";
  const fr = new FranciumSDK({
    connection: new Connection(RPC_NODE),
  });
  const reserves = await fr.getLendingPoolInfo();
  const rates: AssetRate[] = reserves
    .map((reserve) => {
      const token = TOKENS.find((token) => {
        return token.symbol === toAsset(reserve.pool);
      });
      // francium values are returned as whole numbers, divided by 100 convert to decimal for uniformity
      if (token) {
        return {
          asset: token!.symbol,
          mint: new PublicKey(token!.mint),
          deposit: reserve.apy / 100,
          borrow: reserve.borrowInterest / 100,
        };
      }
    })
    .filter((token) => {
      return token !== undefined;
    })
    .map((token) => {
      return token as AssetRate;
    });

  return {
    protocol: "francium",
    rates,
  } as ProtocolRates;
}

function toAsset(asset: string): string {
  switch (asset) {
    case "stSOL":
      return "Lido Staked SOL";
    case "weWETH":
      return "Ether (Wormhole)";
    case "wUST":
      return "UST (Wormhole)";
    case "whETH":
      return "Ether (Wormhole)";

    default:
      return asset;
  }
}
