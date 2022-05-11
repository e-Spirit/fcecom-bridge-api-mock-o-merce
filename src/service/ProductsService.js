'use strict';

const httpClient = require('../utils/http-client');
const { getCategoryNames } = require('./CategoriesService');

const _limit = 30;

const fetchProducts = async ({ _page, productIds, categoryId, q, lang = process.env.DEFAULT_LANG }) => {
  const searchParams = new URLSearchParams({ ...(_page && { _page, _limit }), ...(categoryId && { category_id: categoryId }), ...(q && { q }) });
  productIds &&
    productIds.reduce((innerSearchParams, id) => {
      innerSearchParams.append('id', id);
      return innerSearchParams;
    }, searchParams);
  const { data = [], headers = {} } = await httpClient.get(`products?${searchParams}`);
  const total = headers['x-total-count'] || 0;
  const categoryIds = [...new Set(data.map(({ category_id }) => category_id))];
  const categories = await getCategoryNames(categoryIds, lang);
  const products = data
    .map(({ category_id, ...product }) => ({ ...product, extract: categories[category_id] }))
    .map(({ id, [`name_${lang.toLowerCase()}`]: label, extract, image, thumbnail }) => ({ id, label, extract, image, thumbnail }));
  return { products, total, hasNext: _page && total > _page * _limit };
};

/**
 * Get list of Products
 * Returns a pageable list of products from the shop backend which can be filtered using the query parameters listed below.
 *
 * categoryId String Filter by categoryId (optional)
 * q String Fulltext search query string (optional)
 * lang String The language to localize the label (optional)
 * page Integer Specific result page (optional)
 * returns List
 **/
const productsGet = async function (categoryId, q, lang, page) {
  return fetchProducts({
    categoryId: categoryId,
    q: q,
    lang: lang,
    _page: page,
  });
};

/**
 * Get list of Products by IDs
 * Returns a list of products from the shop backend which match the given productIds.
 *
 * productIds List Get one or more products by productIds (comma-separated)
 * lang String The language to localize the label (optional)
 * returns List
 **/
const productsProductIdsGet = (productIds, lang) => {
  return fetchProducts({
    productIds: productIds,
    lang: lang,
  });
};

module.exports = {
  fetchProducts,
  productsGet,
  productsProductIdsGet,
};
