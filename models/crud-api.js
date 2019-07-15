const koneksi = require('../config/database');
const response = require('../libs/api-response');

// show articles
exports.viewData = function (statement, res) {
    koneksi.query(statement, (err, rows, field) => {
        if (err) throw err;
        response.api(rows, 'Success', res);
        console.log('(API) successfully show the articles');
    });
}

// show users
exports.viewUsers = function (statement, res) {
    koneksi.query(statement, (err, rows, field) => {
        if (err) throw err;
        response.api(rows, 'Success', res);
        console.log('(API) successfully show the users');
    });
}

// insert articles
exports.insert = function (res, statement1, statement2, title, data) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;

        if (rows.length) {
            var values = 'The title are same with the other articles';
            response.api(values, 'Error', res);
            console.log('(API) Errors, the title are same on insert');
        } else {
            koneksi.query(statement2, data, (err, rows, field) => {
                if (err) throw err;
                var values = rows.affectedRows + ' article published!';
                response.api(values, 'Success', res);
                console.log('(API) successfully insert the articles');
            });
        }
    });
}

// update articles
exports.update = function (res, statement1, statement2, title, id, data) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;

        if (rows.length) {
            var values = 'The title that you change are equal with the other articles';
            response.api(values, 'Error', res);
            console.log('(API) Errors, the title are same on update');
        } else {
            koneksi.query(statement2, [data, id], (err, rows, field) => {
                if (err) throw err;

                var values = rows.changedRows + ' article updated!';
                response.api(values, 'Success', res);
                console.log('(API) successfully update the articles');
            });
        }
    });
}

// delete articles
exports.delete = function (statement, id, res) {
    koneksi.query(statement, id, (err, rows, field) => {
        if (err) throw err;

        if (rows.affectedRows == 1) {
            var values = rows.affectedRows + ' article deleted!';
            response.api(values, 'Success', res);
            console.log('(API) successfully delete the articles');
        } else {
            var values = 'No articles with id = ' + id;
            response.api(values, 'Error', res);
            console.log('(API) Failed delete the articles');
        }
    });
} 