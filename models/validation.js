const koneksi = require('../config/database');
const helpers = require('../libs/functions');

exports.viewPage = function (response, url, title) {
    response.render(url, {
        title: title
    });
}

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