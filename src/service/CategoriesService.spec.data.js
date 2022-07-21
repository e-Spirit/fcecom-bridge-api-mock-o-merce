const parentCategory = {
    id: 'slide-stems-touch',
    name_en: 'Slide stems Touch',
    name_de: 'Slade stems Toich',
    parent_id: null,
    url: '/catalog/slide-stems-touch'
};
const childCategory = {
    id: 'replace-calm-attached',
    name_en: 'Replace calm Attached',
    name_de: 'Repluce culm Attuched',
    parent_id: parentCategory.id,
    url: '/catalog/slide-stems-touch/replace-calm-attached'
};
const grandChildCategory = {
    id: 'last-rain-branch',
    name_en: 'Last rain branch',
    name_de: 'Lust ruan brunch',
    parent_id: childCategory.id,
    url: '/catalog/slide-stems-touch/replace-calm-attached/last-rain-branch'
};
const grandChildSiblingCategory = {
    id: 'carefully-correct-progress',
    name_en: 'Carefully Correct Progress',
    name_de: 'Curefilly Correct Progress',
    parent_id: childCategory.id,
    url: '/catalog/slide-stems-touch/replace-calm-attached/carefully-correct-progress'
};
const greatGrandChildCategory = {
    id: 'possibly-fair-deer',
    name_en: 'Possibly Fair Deer',
    name_de: 'Possably Fuar Deer',
    parent_id: grandChildCategory.id,
    url: '/catalog/slide-stems-touch/replace-calm-attached/last-rain-branch/possibly-fair-deer'
};
const fetchCategories = {
    data: [
        parentCategory,
        childCategory,
        grandChildCategory,
        greatGrandChildCategory,
        grandChildSiblingCategory,
        {
            id: 'smallest',
            name_en: 'Smallest',
            name_de: 'Smullest',
            parent_id: null,
            url: '/catalog/smallest'
        },
        {
            id: 'recall',
            name_en: 'Recall',
            name_de: 'Recull',
            parent_id: 'smallest',
            url: '/catalog/smallest/recall'
        },
        {
            id: 'under-longer',
            name_en: 'Under longer',
            name_de: 'Unter langer',
            parent_id: 'recall',
            url: '/catalog/smallest/recall/under-longer'
        },
        {
            id: 'topic',
            name_en: 'Topic',
            name_de: 'Topac',
            parent_id: 'recall',
            url: '/catalog/smallest/recall/topic'
        }
    ],
    headers: {
        'x-total-count': 9
    }
};

const fetchCategoriesByParentId = {
    data: [grandChildCategory, greatGrandChildCategory, grandChildSiblingCategory],
    headers: {
        'x-total-count': 3
    }
};

const filteredCategories = {
    data: [
        grandChildCategory,
        {
            id: 'topic',
            name_en: 'Topic',
            name_de: 'Topac',
            parent_id: 'recall',
            url: '/catalog/smallest/recall/topic'
        }
    ],
    headers: {
        'x-total-count': 2
    }
};

const flattenCategories = {
    data: [
        { id: parentCategory.id, label: parentCategory.name_en },
        { id: childCategory.id, label: childCategory.name_en },
        { id: grandChildCategory.id, label: grandChildCategory.name_en },
        { id: greatGrandChildCategory.id, label: greatGrandChildCategory.name_en },
        { id: grandChildSiblingCategory.id, label: grandChildSiblingCategory.name_en },
        { id: 'smallest', label: 'Smallest' },
        { id: 'recall', label: 'Recall' },
        { id: 'under-longer', label: 'Under longer' },
        { id: 'topic', label: 'Topic' }
    ]
};

module.exports = {
    parentCategory,
    childCategory,
    grandChildCategory,
    grandChildSiblingCategory,
    greatGrandChildCategory,
    fetchCategories,
    fetchCategoriesByParentId,
    filteredCategories,
    flattenCategories
};
