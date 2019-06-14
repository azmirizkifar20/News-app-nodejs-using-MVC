const koneksi = require('../config/database');
const helpers = require('../libs/functions');
const validasi = require('../models/validation');
const Crypter = require('cryptr');
const crypter = new Crypter('myTotalySecretKey');

// show register form
exports.showRegister = function (req, res) {
    validasi.viewPage(res, 'news/register', 'Register to News-app');
}

//show login form
exports.showLogin = function (req, res) {
    validasi.viewPage(res, 'news/login', 'Login to News-app');
}

// register authentication
exports.register = function (req, res) {
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    var encryptedPassword = crypter.encrypt(password);

    if (password !== passwordConfirm) {
        helpers.showAlert(res, 'Password confirmation is not match!', '/register');
        return false;
    }

    var sql1 = 'SELECT * FROM users WHERE username = ?';
    var sql2 = 'INSERT INTO users SET ?';
    validasi.register(res, sql1, sql2, req.body.username, {
        username: req.body.username,
        password: encryptedPassword,
        status: 1
    });
}

// login authentication
// no session and cookies, on process
exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE username = ?';

    koneksi.query(sql, [username], (err, rows, field) => {
        if (err) throw err;

        if (rows.length > 0) {
            decryptedPassword = crypter.decrypt(rows[0].password);
            if (password !== decryptedPassword) {
                helpers.showAlert(res, 'Username or password incorrect!', '/login');
                return false;
            } else {
                helpers.showAlert(res, 'Login successfully!', '/index');
            }
        }
    });
}