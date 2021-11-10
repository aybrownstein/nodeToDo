const router = require('express').Router();
const toDoDb = require('../Db/toDo-db');

router.get('/', async(req, res) => {
    const tasks = await toDoDb.getItems();
    res.render('items/index', { items });
});

router.get('/newitem', async(req, res) => {
    const categories = await toDoDb.getCategories();
    res.render('items/newitem', { categories });
});

router.post('/addItem', async(req, res) => {
    await toDoDb.addItem(req.body);
    res.redirect('/items/');
});

router.post('/markascomplteted', async(req, res) => {
    await toDoDb.markCompleted(req.body);
    res.redirect('/items/');
});

router.get('/completed', async(req, res) => {
    const completedItems = await toDoDb.getCompletedItems();
    res.render('items/completed', { completedItems });
});

router.get('/categories', async(req, res) => {
    const categories = await toDoDb.getCategories();
    res.render('items/categories', { categories });
});

router.get('/newCategory', async(req, res) => {
    res.render('items/newcategory');
});

router.post('/addCategory', async(req, res) => {
    await toDoDb.addCategory(req.body);
    res.redirect('/items/');
});

router.get('/editCategory', async(req, res) => {
    const category = await toDoDb.getcategory(req.query.id);
    res.render('items/editcategory', { category });
});

router.post('/updateCategory', async(req, res) => {
    await toDoDb.updateCategory(req.body);
    res.redirect('/items/categories');
});

module.exports = router;