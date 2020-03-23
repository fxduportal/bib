restaurant = {
    'name':'',
    'location':{
        'streetNumber':'',
        'street':'',
        'city':'',
        'zipcode':'',
        'state':'',
        'country':''
    },
    'cuisineType':'',
    'mark':'',
    'owner':'',
    'avgCost':'',
    'services':{
        'AC':'',
        'handicapedAccess':'',
        'smoker':'',
        'terrace':''
    }
};


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