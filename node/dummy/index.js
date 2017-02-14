var jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken';
var token = jwt.sign({
    foo: 'bar'
}, 'foobar', {
    expiresIn: 1
});

console.log(token);

setTimeout(() => {
    try {
        var decode = jwt.verify(token, 'foobar');
        console.log(decode);
    } catch (error) {
        console.log(error);
    }
}, 1000);
