const moment = require('moment');
const model = require('../models/news-model');
const helpers = require('../libs/functions');
var sendSlug;

// redirect to login
exports.redirect = function (req, res) {
    res.redirect('/login');
}

// halaman index
exports.index = function (req, res) {
    if (req.session.username) {
        model.index(res, 'SELECT * FROM news', 'news/index');
    } else {
        res.redirect('/');
    }
}

// view artikel
exports.view = function (req, res) {
    if (req.session.username) {
        var url = 'news/view';
        var errorsUrl = 'errors/404';
        model.view(res, 'SELECT * FROM news WHERE ?', url, errorsUrl, {
            slug: req.params.slug
        });
    } else {
        res.redirect('/');
    }
}

// buat artikel
exports.createView = function (req, res) {
    if (req.session.username) {
        var date = moment().format('YYYY-MM-DD');
        model.createView(res, date, 'news/create');
    } else {
        res.redirect('/');
    }
}

// fungsi insert
exports.insert = function (req, res) {
    var title = req.body.title;
    var text = req.body.text;
    var writer = req.body.penulis;
    var slug = helpers.slugConvert(title);
    var sql1 = 'SELECT * FROM news WHERE title = ?';
    var sql2 = 'INSERT INTO news SET ?';

    model.insert(res, sql1, title, sql2, {
        title: title,
        slug: slug,
        text: text,
        penulis: writer,
        tanggal: req.body.tanggal
    });
}

// delete artikel
exports.delete = function (req, res) {
    model.delete(res, 'DELETE FROM news WHERE ?', {
        id: req.params.id
    });
}

// edit artikel
exports.edit = function (req, res) {
    if (req.session.username) {
        model.editView(res, 'SELECT * FROM news WHERE ?', {
            slug: req.params.slug
        });
        sendSlug = req.params.slug;
    } else {
        res.redirect('/');
    }
}

// fungsi update
exports.update = function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var slug = helpers.slugConvert(title);
    var sql1 = 'SELECT * FROM news WHERE title = ?';
    var sql2 = 'UPDATE news SET ? WHERE id = ?';

    model.editFunction(res, sql1, sql2, title, sendSlug, id, {
        title: title,
        slug: slug,
        text: req.body.text
    });
}

// 404 error page handling
exports.errorPage = function (req, res) {
    model.errorPageHandling(res, 'errors/404');
}
