const axios = require('axios');
const cheerio = require('cheerio');
const index = require('./index.js')

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @param {String} url
 * @return {Object} restaurant
 */
parse = (data,url) => {
    const $ = cheerio.load(data);
    const name = $('.section-main h2.restaurant-details__heading--title').text().trim();
    var experience = $('#experience-section > ul > li:nth-child(2)').text().trim();
    experience = experience.replace("\n", " ").replace("ò", " ").trim();
    const locationScraped = $(".restaurant-details__heading.d-lg-none > ul > li:nth-child(1)").text().trim();
    const splitedLocation = locationScraped.split(",");
    const location = { 'street': splitedLocation[0], 'city': splitedLocation[1], 'zipcode': splitedLocation[2], 'country': splitedLocation[3] };
    return { name, experience, location, url };
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;
    if (status >= 200 && status < 300) {
        return parse(data.trim(),url);
    }
    console.error(status);
    return null;
};

/**
 * Gives us all the infos from our list of restaurants in order to fill our json the same way we descibed a restaurant in index.js
 * @param {Array} listRestaurants 
 */
scrapeRestaurantFromUrls = async listRestaurants => {
    var restaurantsJSON = [];
    for (let index = 0; index < listRestaurants.length; index++) {
        restaurant = await scrapeRestaurant(listRestaurants[index]);
        restaurantsJSON.push(restaurant);
    }
    return restaurantsJSON;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async url => {
    var listRestaurants = [];
    var listRestaurantsFormatted = [];
    for (let i = 0; i < 15; i++) {
        const response = await axios(url + i);
        const { data, status } = response;
        if (status >= 200 && status < 300) {
            listRestaurants.push(parseRestaurants(data));
        }
        else {
            console.error(status);
            return null;
        }
    }
    listRestaurants.forEach(restaurant => {
        restaurant.forEach(urlRestau => {
            listRestaurantsFormatted.push(urlRestau);
        });
    });
    let restaurantJson = await scrapeRestaurantFromUrls(listRestaurantsFormatted);
    console.table(restaurantJson)
    index.writeInJson('./server/bibList.json', restaurantJson);
};


parseRestaurants = data => {
    const $ = cheerio.load(data);
    var links = []
    const basURL = 'https://guide.michelin.com/';
    $(".js-restaurant__list_items > div.col-md-6.col-lg-6.col-xl-3 > div > a").each((i, elem) => {
        links.push(basURL + $(elem).prop("href"));
    });
    return links;
};
