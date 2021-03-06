import server from './serverMock';

it('returns all the products', () => {
  const products = server.listAllProducts();
  const numberOfProducts = Object.keys(products).length;
  const expectedCount = 15;
  expect(numberOfProducts).toEqual(expectedCount);
});
