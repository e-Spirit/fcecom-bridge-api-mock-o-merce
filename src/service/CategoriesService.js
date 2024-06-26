'use strict';

require('dotenv').config();
const logger = require('../utils/logger');

const LOGGING_NAME = 'CategoriesService';

const httpClient = require('../utils/http-client');
const { ShopError } = require('fcecom-bridge-commons');

const _limit = 30;

/**
 * This method filters categories by their label based on the given keyword.
 * @param {string} keyword Keyword to filter the categories by.
 * @param {any[]} categories Categories to filter.
 * @return {any[]} Filtered categories.
 */
const filterCategories = (keyword, categories) => {
    const query = keyword.toLowerCase();
    return categories.filter(category => category.label?.toLowerCase().includes(query));
}

const fetchCategories = async ({ _page, categoryIds, parentId, keyword, lang }) => {
    /* return flat list of all subcategories from the category tree starting from the defined parentId */
    const language = (lang && lang.toLowerCase()) || process.env.DEFAULT_LANG;
    if (parentId || keyword) {
        const { data = [] } = await httpClient.get(`categories`);
        if (!Array.isArray(data)) {
            logger.logError(LOGGING_NAME, `Failed to get category data for parentId ${parentId}, received`, data);
            throw new ShopError('Failed to get category data');
        }
        const categoryTree = buildCategoryTree(data, language, parentId);
        let categories = flattenCategories(categoryTree);
        
        if (keyword) {
            categories = filterCategories(keyword, categories);
        }

        const total = categories.length;
        const result = [];
        for (let i = 0; i < _limit && i < total - _limit * (_page - 1); i++) {
            result.push(categories[_limit * (_page - 1) + i]);
        }
        return { categories: result, total, hasNext: _page && total > _page * _limit };
    } else {
        const searchParams = new URLSearchParams({ ...(_page && { _page, _limit }) });
        categoryIds &&
            categoryIds.reduce((innerSearchParams, id) => {
                innerSearchParams.append('id', id);
                return innerSearchParams;
            }, searchParams);

        logger.logDebug(LOGGING_NAME, `Performing GET request to /categories with parameters ${searchParams}`);

        const { data = [], headers } = await httpClient.get(`categories?${searchParams}`);
        if (!Array.isArray(data)) {
            logger.logError(LOGGING_NAME, `Failed to get category data, received`, data);
            throw new ShopError('Failed to get category data');
        }
        const total = headers['x-total-count'] || 0;
        const categories = data.map(({ id, [`name_${language}`]: label }) => {
            return { id, label };
        });
        return { categories: categories, total, hasNext: _page && total > _page * _limit };
    }
};

/* Flatten category tree */
const flattenCategories = (categories) => {
    return categories.reduce((result, { children, ...rest }) => {
        result.push(rest);
        if (children) {
            result.push(...flattenCategories(children));
        }
        return result;
    }, []);
};

const buildCategoryTree = (categories, lang, parentId = null) =>
    categories
        .filter((category) => category.parent_id === parentId)
        .map(({ id, [`name_${lang}`]: label }) => {
            const children = buildCategoryTree(categories, lang, id);
            return { id, label, ...(children.length && { children }) };
        });

/**
 * Get Categories
 * Returns all available categories from the shop backend in a tree format in the specified language.
 * If the specified language is not defined for a category or none was set,
 * it displays all categories in the master language by default.
 *
 * lang String The language to localize the label (optional)
 * returns List
 **/

const categoriesGet = async function (parentId, keyword, lang, page) {
    return fetchCategories({
        parentId: parentId,
        keyword: keyword,
        lang: lang,
        _page: page
    });
};

/**
 * Get list of Categories by IDs
 * Returns a list of categories from the shop backend which match the given categoryIds.
 *
 * categoryIds List Get one or more categories by categoryIds (comma-separated)
 * lang String The language to localize the label (optional)
 * returns List
 **/
const categoriesCategoryIdsGet = (categoryIds, lang) => {
    return fetchCategories({
        categoryIds: categoryIds,
        lang: lang
    });
};

const categoryTreeGet = async function (parentId, lang) {
    const language = (lang && lang.toLowerCase()) || process.env.DEFAULT_LANG;

    logger.logDebug(LOGGING_NAME, `Performing GET request to /categories`);

    const { data: categories = [] } = await httpClient.get(`/categories?`);
    return { categorytree: buildCategoryTree(categories, language, parentId) };
};

const categoryTreeHead = function () {
    return new Promise(function (resolve, reject) {
        resolve();
    });
};

const getCategoryNames = async (categoryIds, lang) => {
    lang = (lang && lang.toLowerCase()) || process.env.DEFAULT_LANG;
    const searchParams = categoryIds.reduce((innerSearchParams, id) => {
        innerSearchParams.append('id', id);
        return innerSearchParams;
    }, new URLSearchParams());

    logger.logDebug(LOGGING_NAME, `Performing GET request to /categories with parameters ${searchParams}`);

    const { data = [] } = await httpClient.get(`/categories?${searchParams}`);
    return Object.fromEntries(data.map(({ id, [`name_${lang}`]: label }) => [id, label]));
};

module.exports = {
    buildCategoryTree,
    fetchCategories,
    flattenCategories,
    categoriesGet,
    categoryTreeGet,
    getCategoryNames,
    categoryTreeHead,
    categoriesCategoryIdsGet
};
