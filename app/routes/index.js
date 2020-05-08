module.exports = app => {
    
    const posts = require('./posts');
    const auth = require('./auth');
    const authMiddleware = require("../middlewares/auth");

    app.use('/blog', authMiddleware, posts);
    app.use('/auth', auth);

}