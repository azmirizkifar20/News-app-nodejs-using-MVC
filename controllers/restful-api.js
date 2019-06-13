const helpers = require('../libs/functions');
const model = require('../models/crud-api');

// view articles
exports.showNews = function (req, res) {
    var sql = 'SELECT * FROM news';
    model.viewData(sql, res);
}

// view users
exports.showUSers = function (req, res) {
    var sql = 'SELECT * FROM users';
    model.viewUsers(sql, res);
}

// insert articles
exports.insertNews = function (req, res) {
    var title = req.body.title;
    var slug = helpers.slugConvert(req.body.title);
    var sql1 = 'SELECT * FROM news WHERE title = ?';
    var sql2 = 'INSERT INTO news SET ?';

    model.insert(res, sql1, sql2, title, {
        title: title,
        slug: slug,
        text: req.body.text,
        penulis: req.body.penulis,
        tanggal: req.body.tanggal
    });
}

// update articles
exports.updateNews = function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var slug = helpers.slugConvert(title);

    var sql1 = 'SELECT * FROM news WHERE title = ?';
    var sql2 = 'UPDATE news SET ? WHERE id = ?';

    model.update(res, sql1, sql2, title, id, {
        title: title,
        slug: slug,
        text: req.body.text,
        penulis: req.body.penulis,
        tanggal: req.body.tanggal
    });
}

// delete articles
exports.deleteNews = function (req, res) {
    var id = req.body.id;
    model.delete('DELETE FROM news WHERE id = ?', id, res);
}