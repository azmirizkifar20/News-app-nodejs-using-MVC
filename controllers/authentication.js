const koneksi = require('../config/database');
const helpers = require('../libs/functions');
const validasi = require('../models/validation');
const Crypter = require('cryptr');
const crypter = new Crypter('myTotalySecretKey');

exports.showRegister = function (req, res) {
    validasi.registerView(res, 'news/register', 'Register to News-app');
}

exports.register = function (req, res) {
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    var sql = 'INSERT INTO users SET ?';

    if (password !== passwordConfirm) {
        helpers.showAlert(res, 'Password confirmation is not match!', '/register');
        return false;
    }

    var encryptedPassword = crypter.encrypt(password);
    var data = {
        username: req.body.username,
        password: encryptedPassword,
        status: 1
    };

    koneksi.query(sql, data, (err, rows, password) => {
        if (err) throw err;
        res.redirect('/');
        console.log('user registered sucessfully');
    });
}