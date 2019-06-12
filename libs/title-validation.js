const koneksi = require('../config/database');

exports.titleCreate = function (statement1, title, statement2, data, response) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            console.log("Title are match!");
            var alert = '<script>alert("Judul yang anda masukkan sudah ada!");';
            alert += 'document.location.href = "/create"</script>';
            response.end(alert);
        } else {
            koneksi.query(statement2, data, (err, rows, field) => {
                if (err) throw err;
                console.log(rows.affectedRows + " data created!");
                response.redirect('/');
            });
        }
    });
};

exports.titleUpdate = function (statement1, title, statement2, data, response, slug) {
    koneksi.query(statement1, title, (err, rows, field) => {
        if (err) throw err;
        if (rows.length) {
            console.log("Title are match!");
            var alert = '<script>alert("Judul yang anda ubah sudah ada sebelumnya!");';
            alert += 'document.location.href = "/edit/' + slug + '"</script>';
            response.end(alert);
        } else {
            koneksi.query(statement2, data, (err, rows, field) => {
                if (err) throw err;
                console.log(rows.affectedRows + " data updated!");
                response.redirect('/');
            });
        }
    });
};