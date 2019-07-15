import getData from './service';

it('returns the correct format', () => {
  return getData().then(([data]) => {
    expect(typeof data.symbol).toBe('string');
    expect(typeof data.number_of_txns).toBe('number');
    expect(typeof data.date).toBe('string');
    expect(typeof data.price_usd).toBe('number');
  });
});
