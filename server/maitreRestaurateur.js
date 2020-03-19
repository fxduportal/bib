const axios = require('axios');
const cheerio = require('cheerio');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const parse = data => {

};

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

module.exports.scrapeRestaurant = async url => {
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
        return parse(data);
    }
    console.error(status);

    return null;
};