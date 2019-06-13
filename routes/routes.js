const controller = require('../controllers/controller');
const api = require('../controllers/restful-api');
const express = require('express');
const router = express.Router();

// routing index
router.get('/', controller.index);

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