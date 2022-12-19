//csurf, Cookie Parser and Body Parser packages for CSRF attacks
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrfProtect = csurf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

module.exports ={ 
    csrfProtect,
    parseForm,
    cookieParser
}