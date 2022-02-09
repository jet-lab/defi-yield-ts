import { assert } from "chai";
import { RateObserver } from '../src/rateObserver'
import { ProtocolRates } from '../src/types'

describe('Larix', () => {

  it('Fetch Larix Rates.', async () => {
    const rateObserver = new RateObserver();
    const protocolRates: ProtocolRates = await rateObserver.fetch('larix');
console.log(JSON.stringify(protocolRates, null, 2));
    assert.isTrue(protocolRates.protocol === 'larix');
    assert.isTrue(protocolRates.rates.length > 0);
  });

});
