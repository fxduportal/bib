/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');

async function sandbox(searchLink = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/") {
    try {
        console.log(`🕵️‍♀️  browsing ${searchLink} source`);

        const restaurant = await michelin.get(searchLink);

        var fs = require('fs');
        fs.writeFileSync('server/bibList.json', JSON.stringify(restaurant, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File filled");
        });

        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [, , searchLink] = process.argv;

sandbox(searchLink);
