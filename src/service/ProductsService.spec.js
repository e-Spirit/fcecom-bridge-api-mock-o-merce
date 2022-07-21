const httpClient = require('../utils/http-client');
const data = require('./ProductsService.spec.data');
const service = require('./ProductsService');
const categoriesService = require('./CategoriesService');

jest.mock('../../src/utils/http-client');
jest.mock('../../src/service/CategoriesService.js');

describe('ProductsService', () => {
    describe('fetchProducts', () => {
        it('fetches product data', async () => {
            httpClient.get.mockResolvedValue({ data: data.fetchProducts.data, headers: data.fetchProducts.headers });

            categoriesService.getCategoryNames.mockResolvedValue(data.getCategoryNames.data);

            const body = {
                _page: 1,
                lang: 'EN'
            };

            const result = await service.fetchProducts(body);

            result.products.forEach((product, index) => {
                expect(product.id).toEqual(data.fetchProducts.data[index].id);
                expect(product.label).toEqual(data.fetchProducts.data[index].name_en);
                expect(product.extract).toEqual(data.getCategoryNames.data[data.fetchProducts.data[index].category_id]);
                expect(product.image).toEqual(data.fetchProducts.data[index].image);
                expect(product.thumbnail).toEqual(data.fetchProducts.data[index].thumbnail);
            });
            expect(result.products.length).toEqual(data.fetchProducts.data.length);
            expect(result.total).toEqual(data.fetchProducts.data.length);
            expect(result.hasNext).toEqual(false);
        });
        it('fetches product data that match given Ids', async () => {
            httpClient.get.mockResolvedValue({ data: data.filteredProducts.data, headers: data.filteredProducts.headers });

            categoriesService.getCategoryNames.mockResolvedValue(data.getCategoryNames.data);

            const body = {
                productIds: ['pretty-vast-highway', 'particular', 'paid'],
                lang: 'EN'
            };

            const result = await service.fetchProducts(body);

            result.products.forEach((product, index) => {
                expect(product.id).toEqual(data.filteredProducts.data[index].id);
                expect(product.label).toEqual(data.filteredProducts.data[index].name_en);
                expect(product.extract).toEqual(data.getCategoryNames.data[data.filteredProducts.data[index].category_id]);
                expect(product.image).toEqual(data.filteredProducts.data[index].image);
                expect(product.thumbnail).toEqual(data.filteredProducts.data[index].thumbnail);
            });
        });
    });
});
