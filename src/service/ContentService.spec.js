const httpClient = require('../utils/http-client');
const data = require('./ContentPagesService.spec.data');
const service = require('./ContentService');

jest.mock('../../src/utils/http-client');

describe('ContentService', () => {
    describe('fetchContents', () => {
        it('fetches content pages data', async () => {
            httpClient.get.mockResolvedValue({
                data: data.fetchContentPages.data,
                headers: data.fetchContentPages.headers,
                status: 200
            });

            const body = {
                _page: 1,
                lang: 'EN'
            };

            const result = await service.fetchContent(body);

            result.content.forEach((contentPage, index) => {
                expect(contentPage.id).toEqual(data.fetchContentPages.data[index].id);
                expect(contentPage.label).toEqual(data.fetchContentPages.data[index].name_en);
                expect(contentPage.extract).toEqual(data.fetchContentPages.data[index].url);
            });
            expect(result.content.length).toEqual(data.fetchContentPages.data.length);
            expect(result.total).toEqual(data.fetchContentPages.data.length);
            expect(result.hasNext).toEqual(false);
        });
        it('fetches content pages data that match given Ids', async () => {
            httpClient.get.mockResolvedValue({
                data: data.filteredContentPages.data,
                headers: data.filteredContentPages.headers,
                status: 200
            });

            const body = {
                contentIds: ['hello-world-2, hello-world-4'],
                lang: 'EN'
            };

            const result = await service.fetchContent(body);

            result.content.forEach((contentPage, index) => {
                expect(contentPage.id).toEqual(data.filteredContentPages.data[index].id);
                expect(contentPage.label).toEqual(data.filteredContentPages.data[index].name_en);
                expect(contentPage.extract).toEqual(data.filteredContentPages.data[index].url);
            });
        });
    });
    describe('contentHead', () => {
        it('resolves any value for content pages head', () => {
            const result = service.contentHead();
            expect(result).resolves.not.toThrow();
        });
    });
});
