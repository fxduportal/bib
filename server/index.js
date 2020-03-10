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

const michelin = require('./server/michelin');

const restaurant = michelin.get();
restaurant.forEach(restaurant => {
    console.log(restaurant.name);    
});