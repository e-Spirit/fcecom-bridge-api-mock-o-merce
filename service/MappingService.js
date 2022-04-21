'use strict';

require('dotenv').config();
const httpClient = require('../http-client');
const { productsProductIdsGet } = require('./ProductsService');

const url2id = async (urlWithLang = '') => {
  const [url, lang] = urlWithLang.split('?');
  const langResult = (lang ? lang.slice(5, 7) : process.env.DEFAULT_LANG).toUpperCase()

  if (url.includes('/catalog/p')) {
    const splitUrl = url.split('/catalog/p');
    const path = splitUrl[splitUrl.length - 1];
    const identifiers = path.split('/');

    if (identifiers[identifiers.length - 1].length !== 0) {
      return {
        type: 'product',
        id: identifiers[identifiers.length - 1],
        lang: langResult,
      };
    }
  } else if (url.includes('/catalog/c')) {
    const splitUrl = url.split('/catalog/c');
    const path = splitUrl[splitUrl.length - 1];
    const identifiers = path.split('/');
    if (identifiers[identifiers.length - 1].length !== 0) {
      return {
        type: 'category',
        id: identifiers[identifiers.length - 1],
        lang: langResult,
      };
    }
  } else if (url.includes('/content')) {
    const splitUrl = url.split('/content');
    const identifiers = splitUrl[splitUrl.length - 1].split('/');

    if (identifiers[identifiers.length - 1].length !== 0) {
      return {
        type: 'content',
        id: identifiers[identifiers.length - 1],
        lang: langResult,
      };
    }
  }

  return { type: null, id: null, lang: null };
};

const id2url = async (type, id, lang) => {
  lang = lang ? lang.toLowerCase() : process.env.DEFAULT_LANG;

  switch (type) {
    case 'product':
      return `https://mycommerce.com/catalog/p/${id}?lang=${lang}`;
    case 'category':
      return `https://mycommerce.com/catalog/c/${id}?lang=${lang}`;
    case 'content':
      return `https://mycommerce.com/content/${id}?lang=${lang}`;
    default:
      return undefined;
  }
};

/**
 * Get Storefront URL Identifier
 * Returns an Identifier for a given Storefront URL which is used in FirstSpirit to identify the page.
 *
 * url String Storefront Url
 * returns IdentifierObject
 **/
const lookupUrlGet = async function (url) {
  // return Promise.any([
  return url2id(url);
  //   url2id('/categories', 'category', url),
  //   url2id('/products', 'product', url),
  //   url2id('/contents', 'content', url)]);
};

/**
 * Get Storefront URL
 * Returns a Storefront URL which is build out of the given identifier properties in FirstSpirit.
 *
 * type String Page Type
 * id String Unique Identifier
 * lang String The language to localize the label (optional)
 * returns StorefrontUrl
 **/
const storefrontUrlGet = async function (type, id, lang) {
  return { url: await id2url(type, id, lang) };
};

module.exports = {
  lookupUrlGet,
  storefrontUrlGet,
  url2id,
  id2url,
};
