import assert from 'assert';
import { RateObserver } from '../src/rateObserver'
import { ProtocolRates } from '../src/types'

describe('Apricot', () => {

  it('Fetch Apricot Rates.', async () => {
    const rateObserver = new RateObserver();
    const url = "https://jetprot-main-0d7b.mainnet.rpcpool.com/";
    const protocolRates: ProtocolRates = await rateObserver.fetch('apricot', url);
    assert(protocolRates.protocol === 'apricot');
    assert(protocolRates.rates.length > 0);
    protocolRates.rates.forEach((rate) => { assert(rateObserver.isSupportedToken(rate.asset, rate.mint)); })
  });

});
