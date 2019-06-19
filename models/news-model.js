const koneksi = require('../config/database');
const helpers = require('../libs/functions');

// halaman index
exports.index = function (response, statement, renderURL) {
    koneksi.query(statement, (err, rows, fields) => {
        if (err) throw err;
        response.render(renderURL, {
            title: 'News-App',
            headline: 'Berita terbaru',
            data: rows
        });
    });
}

// view article
exports.view = function (response, sql, renderURL, renderErrorsURL, slug) {
    koneksi.query(sql, slug, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            var teks = rows[0].text;
            var judul = rows[0].title;
            var penulis = rows[0].penulis;
            var tanggal = rows[0].tanggal;
            var dateSend = helpers.tanggalIndo(tanggal);

            response.render(renderURL, {
                title: judul,
                text: teks,
                date: dateSend,
                writer: penulis,
                headline: 'Lihat berita'
            });
        } else {
            response.render(renderErrorsURL, {
                title: "Error Pages",
                message: "404 - The Page can't be found"
            });
        }
    });
}

// create article
exports.createView = function (response, date, renderURL) {
    response.render(renderURL, {
        title: 'Posting Berita',
        headline: 'Buat berita baru',
        date: date
    });
}

// insert function
exports.insert = function (response, statement1, title, statement2, data) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            helpers.showAlert(response, 'Judul yang anda masukkan sudah ada!', '/create');
        } else {
            koneksi.query(statement2, data, (err, rows, field) => {
                if (err) throw err;

                console.log(rows.affectedRows + " data created!");
                response.redirect('/index');
            });
        }
    });
}

// delete article
exports.delete = function (response, sql, id) {
    koneksi.query(sql, id, (err, rows, field) => {
        if (err) throw err;
        console.log(rows.affectedRows + " data deleted!");
        response.redirect('/index');
    });
}

// edit article
exports.editView = function (response, sql, slug) {
    koneksi.query(sql, slug, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            response.render('news/edit', {
                title: 'Edit berita',
                data: rows
            });
        } else {
            response.render('errors/404', {
                title: "Error Pages",
                message: "404 - The Page can't be found"
            });
        }
    });
}

// update function
exports.editFunction = function (response, statement1, statement2, title, sendSlug, id, data) {
    var dataSend = [data, id];
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            helpers.showAlertOptional(response, 'Judul yang anda ubah sudah ada sebelumnya!', '/edit/', sendSlug);
        } else {
            koneksi.query(statement2, dataSend, (err, rows, field) => {
                if (err) throw err;

                console.log(rows.affectedRows + " data updated!");
                response.redirect('/index');
            });
        }
    });
}

// error page handling
exports.errorPageHandling = function (response, renderURL) {
    response.render(renderURL, {
        title: "Error Pages",
        message: "404 - The Page can't be found"
    });
}