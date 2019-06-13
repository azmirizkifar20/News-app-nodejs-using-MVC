const koneksi = require('../config/database');

exports.registerView = function (res, url, title) {
    res.render(url, {
        title: title
    });
}