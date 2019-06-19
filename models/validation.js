const koneksi = require('../config/database');
const helpers = require('../libs/functions');
const Crypter = require('cryptr');
const crypter = new Crypter('myTotalySecretKey');

// view page
exports.viewPage = function (response, url, title) {
    response.render(url, {
        title: title
    });
}

// register
exports.register = function (response, statement1, statement2, username, data) {
    koneksi.query(statement1, username, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            helpers.showAlert(response, 'Username already used!', '/register');
            return false;
        }

        koneksi.query(statement2, data, (err, rows, password) => {
            if (err) throw err;
            response.redirect('/index');
            console.log('user registered sucessfully');
        });
    });
}

// login
exports.login = function (request, response, statement, username, password) {
    koneksi.query(statement, [username], (err, rows, field) => {
        if (err) throw err;

        if (rows.length > 0) {
            var decryptedPassword = crypter.decrypt(rows[0].password);
            if (password !== decryptedPassword) {
                helpers.showAlert(response, 'Username or password incorrect!', '/login');
                return false;
            } else {
                request.session.username = rows[0].username;
                helpers.showAlert(response, 'Login successfully!', '/index');
            }
        }
    });
}