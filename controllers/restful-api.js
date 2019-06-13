const helpers = require('../libs/functions');
const model = require('../models/crud-api');

exports.showNews = function (req, res) {
    var sql = 'SELECT * FROM news';
    model.viewData(sql, res);
}

exports.showUSers = function (req, res) {
    var sql = 'SELECT * FROM users';
    model.viewUsers(sql, res);
}

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