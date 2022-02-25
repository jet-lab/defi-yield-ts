import assert from "assert";
import { PublicKey } from "@solana/web3.js"

export type Protocol =
| 'apricot'
| 'francium'
| 'jet'
| 'larix'
| 'mango'
| 'port'
| 'solend'
| 'tulip'
| '01';

export type ProtocolRates = {
  protocol: Protocol;
  rates: AssetRate[];
};

export type AssetRate = {
  asset: string;
  mint: PublicKey;
  deposit: number | undefined;
  borrow: number | undefined;
  //TODO totalDeposit: number | undefined;
  //TODO totalBorrow: number | undefined;
};

export function toRate(rate: string): number {
  assert(rate.endsWith('%'));
  return parseFloat(rate.substring(0, rate.length - 1)) * 0.01;
}
