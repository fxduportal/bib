const axios = require('axios');
const cheerio = require('cheerio');
const index = require('./index.js')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const parse = data => {
    const $ = cheerio.load(data);
    let restaurants = [];
    let name = [];
    let address = [];
    let tel = [];
    let response = $('div.single_libel').each(function (i, elem) {
        name.push($(this).text().trim().split(" (")[0]);
    });
    response = $('div.single_info3').each(function (i, elem) {
        let street = $(this)[0].children[3].children[3].children[0].data.trim();
        let city = ($(this)[0].children[3].children[3].children[0].next.next.data.trim());
        address.push(street + ' ' + city);
        tel.push(($(this)[0].children[5].children[3].children[0].data.trim()));
    });
    for (let i = 0; i < name.length; i++) {
        restaurants.push({ 'name': name[i], 'address': address[i], 'tel': tel[i] });
    }
    return restaurants;
};

module.exports.httpGet = async url => {
    var restaus = [];
    var responseParsed = [];
    do {
        try {
            let nb_page = 1;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", `https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult?page=${nb_page}&request_id=07d54324f80f6ac950149192e3d19cca`, false);
            xmlHttp.send();
            var response = xmlHttp.responseText;
            responseParsed = parse(response)
            restaus.push(...responseParsed);
            nb_page += 1;
            console.log(nb_page)
        }catch(error){
            console.error(error);
            return null;
        };
    } while (responseParsed != null)

    index.writeInJson('./server/MrList.json', restaus);
}