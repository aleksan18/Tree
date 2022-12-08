//csurf, Cookie Parser and Body Parser packages for CSRF attacks
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let csurf = require('csurf');

let csrfProtect = csurf({ cookie: true });
let parseForm = bodyParser.urlencoded({ extended: false });

/*const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays)*/

module.exports ={ 
    csrfProtect,
    parseForm,
    cookieParser
}