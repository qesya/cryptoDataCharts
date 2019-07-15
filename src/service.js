export default function getData() {
  return Promise.resolve([{
    symbol: 'BNB',
    number_of_txns: 18522,
    date: new Date().toISOString(),
    price_usd: 33.86
  }]);
};
