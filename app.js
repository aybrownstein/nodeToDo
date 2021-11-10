const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const itemsRoutes = require('./routes/items');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/items', itemsRoutes);
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => console.log('server started'));