const helpers = require('../libs/functions');
const koneksi = require('../config/database');
const response = require('../libs/api-response');

// show articles
exports.viewData = function (statement, res) {
    koneksi.query(statement, (err, rows, field) => {
        if (err) throw err;
        response.api(rows, 200, res);
        console.log('(API) success show articles');
    });
}

// show users
exports.viewUsers = function (statement, res) {
    koneksi.query(statement, (err, rows, field) => {
        if (err) throw err;
        response.api(rows, 200, res);
        console.log('(API) success show users');
    });
}

// insert articles
exports.insert = function (res, statement1, statement2, title, data) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;

        if (rows.length) {
            var values = 'The title are same with the other articles';
            response.api(values, 406, res);
            console.log('(API) Errors, the title are same');
        } else {
            koneksi.query(statement2, data, (err, rows, field) => {
                if (err) throw err;
                var values = rows.affectedRows + ' article published!';
                response.api(values, 200, res);
                console.log('(API) success insert articles');
            });
        }
    });
}