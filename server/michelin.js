const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
    const $ = cheerio.load(data);
    const name = $('.section-main h2.restaurant-details__heading--title').text().trim();
    var experience = $('#experience-section > ul > li:nth-child(2)').text().trim();
    experience = experience.replace("\n", " ").replace("ò", " ").trim();
    const locationScraped = $(".restaurant-details__heading.d-lg-none > ul > li:nth-child(1)").text().trim();
    const splitedLocation = locationScraped.split(",");
    const location = { 'street': splitedLocation[0], 'city': splitedLocation[1], 'zipcode': splitedLocation[2], 'country': splitedLocation[3] };
    return { name, experience, location };
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
        return parse(data.trim());
    }
    console.error(status);

    return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async url => {
    var listRestaurants = [];

    for (let i = 0; i < 15; i++) {
        const response = await axios(url + i);
        const { data, status } = response;
        if (status >= 200 && status < 300) {
            var restaurant = parseRestaurants(data);
            for (let index = 0; index < restaurant.length; index++) {
                listRestaurants.push(restaurant[index]);
            }
        }
        else {
            console.error(status);
        }
        writeInJson('./bibList.json',listRestaurants);
    }
};

function writeInJson(nameFile, jsonToInsert) {
    var fs = require('fs');
    fs.writeFileSync(nameFile, JSON.stringify(jsonToInsert, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File filled");
    })
};

const parseRestaurants = data => {
    const $ = cheerio.load(data);
    var links = []
    const basURL = 'https://guide.michelin.com/';
    $(".js-restaurant__list_items > div.col-md-6.col-lg-6.col-xl-3 > div > a").each((i, elem) => {
        links.push(basURL + $(elem).prop("href"));
    });
    return links;
};
