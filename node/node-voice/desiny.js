var request = require('request');
var fs = require('fs');


var api = 'http://www.17disney.com/tp/api/disney?type=2';


request(api, function (error, response, body) {
    var raw = JSON.parse(body);
    console.log(JSON.stringify(raw, null, 4));
});
