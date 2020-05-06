const Router = require('koa-router');
const router = new Router();

const message = require('./controllers/message.controller');

router.get('/messages', message.getAllMessages);
router.post('/messages', message.set);

module.exports = router;