'use strict';

const httpClient = require('../utils/http-client');
const logger = require('../utils/logger');

const LOGGING_NAME = 'ContentPagesService';

const _limit = 30;

const fetchContentPages = async ({ _page, contentIds, q, lang = process.env.DEFAULT_LANG }) => {
    const searchParams = new URLSearchParams({ ...(_page && { _page, _limit }), ...(q && { q }) });
    contentIds &&
        contentIds.reduce((innerSearchParams, id) => {
            innerSearchParams.append('id', id);
            return innerSearchParams;
        }, searchParams);

    logger.logDebug(LOGGING_NAME, `Performing GET request to /contentpages with parameters ${searchParams}`);

    const { data = [], headers } = await httpClient.get(`contentpages?${searchParams}`);
    const total = headers['x-total-count'] || 0;
    const contentPages = data.map(
        ({ id, [`name_${process.env.DEFAULT_LANG}`]: _label, [`name_${lang.toLowerCase()}`]: label = _label, url: extract }) => {
            return { id, label, extract };
        }
    );

    return { contentPages: contentPages, total, hasNext: _page && total > _page * _limit };
};

const emptyResolvingPromise = new Promise(function (resolve, reject) {
    resolve();
});

/**
 * Delete Content Page
 * Remove a Content Page from the Storefront and its page reference in FirstSpirit.
 *
 * contentId String Delete content page by contentId
 * lang String The language to localize the label (optional)
 * no response value expected for this operation
 **/
const contentPagesContentIdDelete = function (contentId, lang) {
    logger.logError(LOGGING_NAME, `Endpoint not implemented`);
    return emptyResolvingPromise;
};

/**
 * Update Content Page
 * Edit information of a Content Page. Changes are reflected in both the storefront and in the page reference in FirstSpirit.
 *
 * body ContentPage
 * lang String The language to localize the label (optional)
 * contentId String Update content page by contentId
 * no response value expected for this operation
 **/
const contentPagesContentIdPut = function (body, lang, contentId) {
    logger.logError(LOGGING_NAME, `Endpoint not implemented`);
    return emptyResolvingPromise;
};

/**
 * Get list of Content Pages by IDs
 * Returns a list of Content Pages which match the given contentIds.   [Try it out.](http://localhost:3000/api/#/contentpages/contentpagesContentIdsGet)
 *
 * contentIds List Get one or more content pages by contentIds (comma-separated)
 * lang String The language to localize the label (optional)
 * returns List
 **/
const contentPagesContentIdsGet = function (contentIds, lang) {
    return fetchContentPages({
        contentIds: contentIds,
        lang: lang
    });
};

/**
 * Get a list of Content Pages
 * Returns a pageable list of Content Pages which can be filtered using the query parameters listed below.
 *
 * q String Fulltext search query string (optional)
 * lang String The language to localize the label (optional)
 * page Integer Specific result page (optional)
 * returns List
 **/
const contentPagesGet = function (q, lang, page) {
    return fetchContentPages({
        q: q,
        lang: lang,
        _page: page
    });
};

/**
 * Support Content Report
 * Checks if the Content Report exists in the FirstSpirit module.
 * The Content Report is used to display existing content pages from the shop in FirstSpirit.
 * By default the Content Report is activated.
 *
 * no response value expected for this operation
 **/
const contentPagesHead = function () {
    return emptyResolvingPromise;
};

/**
 * Create Content Page
 * Create a new Content Page in the storefront and its page reference in FirstSpirit.
 *
 * body ContentPage
 * lang String The language to localize the label (optional)
 * returns IdProviding
 **/
const contentPagesPost = function (body, lang) {
    logger.logError(LOGGING_NAME, `Endpoint not implemented`);
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            id: 'id'
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};

module.exports = {
    fetchContentPages,
    contentPagesContentIdDelete,
    contentPagesContentIdPut,
    contentPagesContentIdsGet,
    contentPagesGet,
    contentPagesHead,
    contentPagesPost
};
