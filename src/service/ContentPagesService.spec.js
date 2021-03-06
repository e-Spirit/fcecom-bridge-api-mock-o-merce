const httpClient = require('../utils/http-client');
const data = require('./ContentPagesService.spec.data');
const service = require('./ContentPagesService');

jest.mock('../../src/utils/http-client');

describe('ContentPagesService', () => {
    describe('fetchContents', () => {
        it('fetches content pages data', async () => {
            httpClient.get.mockResolvedValue({ data: data.fetchContentPages.data, headers: data.fetchContentPages.headers });

            const body = {
                _page: 1,
                lang: 'EN'
            };

            const result = await service.fetchContentPages(body);

            result.contentPages.forEach((contentPage, index) => {
                expect(contentPage.id).toEqual(data.fetchContentPages.data[index].id);
                expect(contentPage.label).toEqual(data.fetchContentPages.data[index].name_en);
                expect(contentPage.extract).toEqual(data.fetchContentPages.data[index].url);
            });
            expect(result.contentPages.length).toEqual(data.fetchContentPages.data.length);
            expect(result.total).toEqual(data.fetchContentPages.data.length);
            expect(result.hasNext).toEqual(false);
        });
        it('fetches content pages data that match given Ids', async () => {
            httpClient.get.mockResolvedValue({ data: data.filteredContentPages.data, headers: data.filteredContentPages.headers });

            const body = {
                contentIds: ['hello-world-2, hello-world-4'],
                lang: 'EN'
            };

            const result = await service.fetchContentPages(body);

            result.contentPages.forEach((contentPage, index) => {
                expect(contentPage.id).toEqual(data.filteredContentPages.data[index].id);
                expect(contentPage.label).toEqual(data.filteredContentPages.data[index].name_en);
                expect(contentPage.extract).toEqual(data.filteredContentPages.data[index].url);
            });
        });
    });
    describe('contentPagesHead', () => {
        it('resolves any value for content pages head', () => {
            const result = service.contentPagesHead();
            expect(result).resolves.not.toThrow();
        });
    });
});
