const categoryId1 = 'slide-stems-touch';
const categoryId2 = 'replace-calm-attached';
const categoryId3 = 'topic';

module.exports.fetchProducts = {
    data: [
        {
            id: 'pretty-vast-highway',
            name_en: 'Pretty Vast highway',
            name_de: 'Pretty Vust haghwuy',
            category_id: categoryId1,
            url: '/catalog/slide-stems-touch/pretty-vast-highway',
            image: 'https://picsum.photos/seed/pretty-vast-highway/540/960',
            thumbnail: 'https://picsum.photos/seed/pretty-vast-highway/160/120'
        },
        {
            id: 'develop',
            name_en: 'Develop',
            name_de: 'Develop',
            category_id: categoryId3,
            url: '/catalog/smallest/recall/topic/develop',
            image: 'https://picsum.photos/seed/develop/540/960',
            thumbnail: 'https://picsum.photos/seed/develop/160/120'
        },
        {
            id: 'recall-walk-great',
            name_en: 'Recall walk Great',
            name_de: 'Recull wulk Greut',
            category_id: categoryId3,
            url: '/catalog/smallest/recall/topic/recall-walk-great',
            image: 'https://picsum.photos/seed/recall-walk-great/540/960',
            thumbnail: 'https://picsum.photos/seed/recall-walk-great/160/120'
        },
        {
            id: 'particular',
            name_en: 'Particular',
            name_de: 'Purtacilur',
            category_id: categoryId2,
            url: '/catalog/slide-stems-touch/replace-calm-attached/particular',
            image: 'https://picsum.photos/seed/particular/540/960',
            thumbnail: 'https://picsum.photos/seed/particular/160/120'
        },
        {
            id: 'paid',
            name_en: 'Paid',
            name_de: 'Puad',
            category_id: categoryId2,
            url: '/catalog/slide-stems-touch/replace-calm-attached/paid',
            image: 'https://picsum.photos/seed/paid/540/960',
            thumbnail: 'https://picsum.photos/seed/paid/160/120'
        }
    ],
    headers: {
        'x-total-count': 5
    }
};

module.exports.filteredProducts = {
    data: [
        {
            id: 'pretty-vast-highway',
            name_en: 'Pretty Vast highway',
            name_de: 'Pretty Vust haghwuy',
            category_id: categoryId1,
            url: '/catalog/slide-stems-touch/pretty-vast-highway',
            image: 'https://picsum.photos/seed/pretty-vast-highway/540/960',
            thumbnail: 'https://picsum.photos/seed/pretty-vast-highway/160/120'
        },
        {
            id: 'particular',
            name_en: 'Particular',
            name_de: 'Purtacilur',
            category_id: categoryId2,
            url: '/catalog/slide-stems-touch/replace-calm-attached/particular',
            image: 'https://picsum.photos/seed/particular/540/960',
            thumbnail: 'https://picsum.photos/seed/particular/160/120'
        },
        {
            id: 'paid',
            name_en: 'Paid',
            name_de: 'Puad',
            category_id: categoryId2,
            url: '/catalog/slide-stems-touch/replace-calm-attached/paid',
            image: 'https://picsum.photos/seed/paid/540/960',
            thumbnail: 'https://picsum.photos/seed/paid/160/120'
        }
    ],
    headers: {
        'x-total-count': 3
    }
};

module.exports.getCategoryNames = {
    data: {
        [categoryId1]: 'Slide stems Touch',
        [categoryId2]: 'Replace calm Attached'
    }
};
