const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
     (err.status >= 100 && err.status < 600) ?  res.status(err.status) : res.render('error');
     next();
});

app.listen(3000, () => {
    console.log('The application is running on the localhost:3000')
});