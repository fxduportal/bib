/**
 * 
 */
restaurant = {
    'name': '',
    'location': {
        'streetNumber': '',
        'street': '',
        'city': '',
        'zipcode': '',
        'state': '',
        'country': ''
    },
    'cuisineType': '',
    'mark': '',
    'owner': '',
    'avgCost': '',
    'services': {
        'AC': '',
        'handicapedAccess': '',
        'smoker': '',
        'terrace': ''
    }
};


const michelin = require('./michelin');
const maitreRestaurateur = require('./maitreRestaurateur')

async function init(searchLink = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/") {
    try {
        //await michelin.get(searchLink);
        await maitreRestaurateur.httpGet(searchLink);

        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [, , searchLink] = process.argv;

init(searchLink);


module.exports.writeInJson = (nameFile, jsonToInsert) => {
    var fs = require('fs');
    fs.writeFileSync(nameFile, JSON.stringify(jsonToInsert, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File filled");
    });
};