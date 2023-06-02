const { Router } = require('express');
const { getFunc, postFunc, putFunc, deletFunc } = require('../controlle/blogs.controlle');

const blogs = Router();

blogs.get('/blogs', getFunc);
blogs.post('/blogs', postFunc);
blogs.put('/blogs', putFunc);
blogs.delete('/blogs', deletFunc);

module.exports = blogs;