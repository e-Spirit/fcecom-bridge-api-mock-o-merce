const httpClient = require('../utils/http-client');
const data = require('./CategoriesService.spec.data');
const service = require('./CategoriesService');

jest.mock('../../src/utils/http-client');

describe('CategoriesService', () => {
    describe('fetchCategories', () => {
        it('fetches category data', async () => {
            httpClient.get.mockResolvedValue({ data: data.fetchCategories.data, headers: data.fetchCategories.headers });

            const body = {
                _page: 1,
                lang: 'EN'
            };

            const result = await service.fetchCategories(body);

            result.categories.forEach((category, index) => {
                expect(category.id).toEqual(data.fetchCategories.data[index].id);
                expect(category.label).toEqual(data.fetchCategories.data[index].name_en);
            });
            expect(result.categories.length).toEqual(data.fetchCategories.data.length);
            expect(result.total).toEqual(data.fetchCategories.data.length);
            expect(result.hasNext).toEqual(false);
        });
        it('fetches category data from categories that match the given ids', async () => {
            httpClient.get.mockResolvedValue({ data: data.filteredCategories.data, headers: data.filteredCategories.headers });
            const testCategory = data.grandChildCategory;

            const body = {
                categoryIds: [testCategory.id, 'topic'],
                lang: 'EN'
            };

            const result = await service.fetchCategories(body);

            result.categories.forEach((category, index) => {
                expect(category.id).toEqual(data.filteredCategories.data[index].id);
                expect(category.label).toEqual(data.filteredCategories.data[index].name_en);
            });
        });
        it('fetches category data starting from a specific node', async () => {
            httpClient.get.mockResolvedValue({
                data: data.fetchCategoriesByParentId.data,
                headers: data.fetchCategoriesByParentId.headers
            });

            const body = {
                _page: 1,
                parentId: 'replace-calm-attached',
                lang: 'EN'
            };

            const result = await service.fetchCategories(body);

            result.categories.forEach((category, index) => {
                expect(category.id).toEqual(data.fetchCategoriesByParentId.data[index].id);
                expect(category.label).toEqual(data.fetchCategoriesByParentId.data[index].name_en);
            });
            expect(result.categories.length).toEqual(data.fetchCategoriesByParentId.data.length);
            expect(result.total).toEqual(data.fetchCategoriesByParentId.data.length);
            expect(result.hasNext).toEqual(false);
        });
    });
    describe('buildCategoryTree', () => {
        it('builds a tree from the flat array of categories', () => {
            httpClient.get.mockResolvedValue({ data: data.fetchCategories });

            const result = service.buildCategoryTree(data.fetchCategories.data, 'en');

            expect(result[0].id).toEqual(data.parentCategory.id);
            expect(result[0].children[0].id).toEqual(data.childCategory.id);
            expect(result[0].children[0].children[0].id).toEqual(data.grandChildCategory.id);
            expect(result[0].children[0].children[1].id).toEqual(data.grandChildSiblingCategory.id);
            expect(result[1].id).toEqual('smallest');
            expect(result[1].children[0].id).toEqual('recall');
            expect(result[1].children[0].children[0].id).toEqual('under-longer');
            expect(result[1].children[0].children[1].id).toEqual('topic');
        });
    });
    describe('categoryTreeHead', () => {
        it('resolves any value for category tree head', () => {
            const result = service.categoryTreeHead();
            expect(result).resolves.not.toThrow();
        });
    });
    describe('getCategoryNames', () => {
        it('gets language-specific category names', async () => {
            httpClient.get.mockResolvedValue({ data: data.filteredCategories.data });
            const testCategory = data.grandChildCategory;

            const resultEN = await service.getCategoryNames([testCategory.id, 'topic'], 'en');
            const resultDE = await service.getCategoryNames([testCategory.id, 'topic'], 'de');

            expect(resultEN).toMatchObject({ [testCategory.id]: testCategory.name_en, topic: 'Topic' });
            expect(resultDE).toMatchObject({ [testCategory.id]: testCategory.name_de, topic: 'Topac' });
        });
    });
    describe('flattenCategories', () => {
        it('flattens the tree to a flat array of categories', () => {
            const categoryTree = service.buildCategoryTree(data.fetchCategories.data, 'en');
            httpClient.get.mockResolvedValue({ data: data.flattenCategories.data });

            const result = service.flattenCategories(categoryTree);

            result.forEach((category, index) => {
                expect(category.id).toEqual(data.fetchCategories.data[index].id);
                expect(category.label).toEqual(data.fetchCategories.data[index].name_en);
            });
        });
    });
});
