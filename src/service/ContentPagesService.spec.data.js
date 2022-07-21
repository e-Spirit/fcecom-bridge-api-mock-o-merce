const helloWorldString = 'Hello World';
const helloWorldStandards = {
    name_en: helloWorldString,
    name_de: helloWorldString,
    template: 'content',
    visible: true,
    parentId: null,
    nextSiblingId: null
};
const testData = Array.from(Array(9).keys()).map((index) => {
    const indexString = index ? `-${index + 1}` : '';
    return {
        id: `hello-world${indexString}`,
        ...helloWorldStandards,
        url: `/hello-world${indexString}/`
    };
});
module.exports.fetchContentPages = {
    data: testData,
    headers: {
        'x-total-count': 9
    }
};

module.exports.filteredContentPages = {
    data: [
        {
            id: 'hello-world-2',
            ...helloWorldStandards,
            url: '/hello-world-2/'
        },
        {
            id: 'hello-world-4',
            ...helloWorldStandards,
            url: '/hello-world-4/'
        }
    ],
    headers: {
        'x-total-count': 2
    }
};
