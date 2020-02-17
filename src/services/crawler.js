var request = require("request-promise");
var cheerio = require("cheerio")
const BASE_URL = "https://lista.mercadolivre.com.br/"
const STORES_PREFIX = "por ";

const searchProducts = async (search, limit) => {
    var products = await requestProducts(BASE_URL + search);
    if(products.length < limit){
        var pagination = await requestPagination(BASE_URL + search);
        for(let i in pagination){
            let productsPage = await requestProducts(pagination[i]);
            var products = products.concat(productsPage);
            if(products.length >= limit){
                break;
            }
        }
    }
    var products = products.slice(0, limit);
    return products;
}

function requestProducts(url) {
    return new Promise((resolve, reject) => {
        const options = {
            url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        request.get(options)
        .then(($) => {

            var products = [];
            $('#searchResults li.article').each(function () {
                var url = $(this).find('.item__info-title').attr('href');
                var name = $(this).find('.main-title').text().trim();
                var store = $(this).find('.item__brand-title-tos').text().trim();
                store = store.indexOf(STORES_PREFIX) == 0 ? store.slice(STORES_PREFIX.length) : store;
                var state = $(this).find('.item__condition').text().trim();
                var decimal = $(this).find('div.item__price > span.price__decimals').text();
                var price = $(this).find('div.item__price > span.price__fraction').text();
                price = price.replace('.', '') + (decimal != '' ? '.' + decimal : '.00');

                products.push({
                    name : name,
                    url : url,
                    price : price,
                    store: store == "" ? null : store,
                    state : state == "" ? null : state
                });

            });

            resolve(products);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

function requestPagination(url) {
    return new Promise((resolve, reject) => {
        const options = {
            url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        request.get(options)
        .then(($) => {
            var paginationLinks = [];
            $('.pagination__container > ul > li').each(function () {
                const url = $(this).find('a').attr('href');
                if (url != '#') {
                    paginationLinks.push(url);
                }
            });
            resolve(paginationLinks);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

module.exports = { searchProducts };