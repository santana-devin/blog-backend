const express = require('express');
const routes = express.Router();

const postsContoller = require('../controllers/postsController');

routes.get('/posts', postsContoller.index );

routes.get('/posts/:id', postsContoller.store );

routes.post('/posts', postsContoller.create );

routes.put('/posts/:id', postsContoller.update );

routes.delete('/posts/:id', postsContoller.delete );

module.exports =  routes;