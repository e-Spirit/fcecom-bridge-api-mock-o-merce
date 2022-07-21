const httpClient = require('../utils/http-client');
const service = require('./MappingService');
const products = require('./ProductsService.spec.data');
const categories = require('./CategoriesService.spec.data');
const contentPages = require('./ContentPagesService.spec.data');

jest.mock('../../src/utils/http-client');

describe('MappingService', () => {
    describe('storefrontUrlGet', () => {
        it('returns the storefront url for a product', async () => {
            const type = 'product';
            const id = products.fetchProducts.data[0].id;
            const lang = 'EN';

            const result = await service.storefrontUrlGet(type, id, lang);

            expect(result).toEqual({ url: 'https://mycommerce.com/catalog/p/pretty-vast-highway?lang=en' });
        });
        it('returns the storefront url for a category', async () => {
            const type = 'category';
            const id = categories.fetchCategories.data[0].id;
            const lang = 'EN';

            const result = await service.storefrontUrlGet(type, id, lang);

            expect(result).toEqual({ url: 'https://mycommerce.com/catalog/c/slide-stems-touch?lang=en' });
        });
        it('returns the storefront url for a content page', async () => {
            const type = 'content';
            const id = contentPages.fetchContentPages.data[0].id;
            const lang = 'EN';

            const result = await service.storefrontUrlGet(type, id, lang);

            expect(result).toEqual({ url: 'https://mycommerce.com/content/hello-world?lang=en' });
        });
    });
    describe('lookupUrlGet', () => {
        it('returns the identifier for a storefront url', async () => {
            const productUrl = 'https://mycommerce.com/catalog/p/pretty-vast-highway?lang=en';
            const categoryUrl = 'https://mycommerce.com/catalog/c/slide-stems-touch?lang=en';
            const contentPageUrl = 'https://mycommerce.com/content/hello-world?lang=en';

            const result1 = await service.lookupUrlGet(productUrl);
            const result2 = await service.lookupUrlGet(categoryUrl);
            const result3 = await service.lookupUrlGet(contentPageUrl);

            expect(result1).toEqual({ type: 'product', id: 'pretty-vast-highway', lang: 'EN' });
            expect(result2).toEqual({ type: 'category', id: 'slide-stems-touch', lang: 'EN' });
            expect(result3).toEqual({ type: 'content', id: 'hello-world', lang: 'EN' });
        });
    });
});
