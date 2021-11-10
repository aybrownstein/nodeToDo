const router = require('express').Router();
const toDoDb = require('../Db/toDo-db');

router.get('/', async(req, res) => {
    const tasks = await toDoDb.getItems();
    res.render('items/index', { items });
});

module.exports = router;