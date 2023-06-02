const { Router } = require('express');
const { postFunc } = require('../controlle/user.controlle');

const routes = Router();

routes.post('/login', postFunc);
routes.post('/register', postFunc);

module.exports = routes;