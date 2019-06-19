const helpers = require('../libs/functions');
const validasi = require('../models/validation');

// show register form
exports.showRegister = function (req, res) {
    if (!req.session.username) {
        validasi.viewPage(res, 'news/register', 'Register to News-app');
    } else {
        res.redirect('/index');
    }
}

//show login form
exports.showLogin = function (req, res) {
    if (!req.session.username) {
        validasi.viewPage(res, 'news/login', 'Login to News-app');
    } else {
        res.redirect('/index');
    }
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
// no cookies, on process
exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE username = ?';
    validasi.login(req, res, sql, username, password);
}

// logout
exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login');
}