/**
 * Complete schema for a restaurant, we are not getting all those infos as this is not necessary. But for a more complete and long term project it would be interesting.
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

var fs = require('fs');


const michelin = require('./michelin');
const maitreRestaurateur = require('./maitreRestaurateur')

async function initDB(searchLink = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/") {
    try {
        //await michelin.get(searchLink);
        await maitreRestaurateur.httpGet();
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [, , searchLink] = process.argv;

initDB(searchLink);


module.exports.writeInJson = (nameFile, jsonToInsert) => {
    fs.writeFileSync(nameFile, JSON.stringify(jsonToInsert, null, 4), (err) => {
        if (err) {
            console.error(err);
            return null;
        };
        console.log("File filled");
    });
};


var readJson = (nameFile) => {
    var readJson = fs.readFileSync(nameFile)
    return readJson;
};

const linkTwoJson = () => {
    var bibAndMr = [];
    const bib = readJson('./server/bibList.json');
    const Mr = readJson('./server/MrList.json');

    bib.forEach(bibRest => {
        if(bibRest.name ){}
    });
}