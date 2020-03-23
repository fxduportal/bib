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
var stringSimilarity = require('string-similarity');


const michelin = require('./michelin');
const maitreRestaurateur = require('./maitreRestaurateur')

async function initDB(searchLink = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/") {
    try {
        await michelin.get(searchLink);
        await maitreRestaurateur.httpGet();
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

const [, , searchLink] = process.argv;

//initDB(searchLink);


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
    let bibAndMr = [];
    let key = 1;
    let rest = {};
    const bib = require('./bibList.json');
    const Mr = require('./MrList.json');
    let mrNames = [];
    let mrAdress = [];
    Mr.forEach(MrRestau => {
        mrNames.push(MrRestau.name);
        mrAdress.push(MrRestau.address)
    });
    console.table(mrAdress)

    bib.forEach(bibRestau => {
        if (bibRestau.location.city != null) {
            var matcheName = stringSimilarity.findBestMatch(bibRestau.name, mrNames);
            var matcheAdress = stringSimilarity.findBestMatch(bibRestau.location.city, mrAdress);
            console.log(matcheName.bestMatch.rating);
            bibRestau.experience = bibRestau.experience.replace("ò", " ").trim()
            if (matcheName.bestMatch.rating >= 0.6 && matcheAdress.bestMatch.rating >= 0.2) {
                rest = {
                    key: key,
                    name: bibRestau.name,
                    experience: bibRestau.experience,
                    street: bibRestau.location.street,
                    city: bibRestau.location.city,
                    zipcode: bibRestau.location.zipcode,
                    country: bibRestau.location.country
                };
                bibAndMr.push(rest);
                console.table(bibAndMr);
                key += 1;
            };
        }

    });
    console.table(bibAndMr);
    writeInJson("./server/bibAndmr.json", bibAndMr);
};

linkTwoJson();