const api = require('../controllers/restful-api');
const controller = require('../controllers/controller');
const authentication = require('../controllers/authentication');
const express = require('express');
const router = express.Router();

// router redirect
router.get('/', controller.redirect);

// routing index
router.get('/index', controller.index);

// routing view
router.get('/view/:slug', controller.view);

// routing create article
router.get('/create', controller.createView);

// fungsi insert
router.post('/posting', controller.insert);

// routing delete article
router.get('/delete/:id', controller.delete);

// routing edit 
router.get('/edit/:slug', controller.edit);

// fungsi update
router.post('/update', controller.update);

// routing register
router.get('/register', authentication.showRegister);

// routing login
router.get('/login', authentication.showLogin);

// routing logout
router.get('/logout', authentication.logout);

// authenticate register
router.post('/auth-register', authentication.register);

// authenticate login
router.post('/auth-login', authentication.login);

// (API) show data news  
router.get('/api/data', api.showNews);

// (API) show user  
router.get('/api/users', api.showUSers);

// (API) insert articles 
router.post('/api', api.insertNews);

// (API) update articles 
router.put('/api', api.updateNews);

// (API) delete articles 
router.delete('/api', api.deleteNews);

// 404 page handling
router.get('*', controller.errorPage);

module.exports = router;