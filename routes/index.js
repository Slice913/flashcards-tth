const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    const err = new Error('❌');
    err.status = 500;
    next();
});

router.use((req, res, next) => {
    next(); 
});


// redirect to hello when no cookie is avaiable to read
router.get('/',(req, res) => {
    const name = req.cookies.username;
    name ? res.render('index',{ name }) : res.redirect('/hello');

});

// hello route
router.get('/hello', (req, res ) => {
    // redirect if username to index page value is set, if not redirect to the hello form
    const name = req.cookies.username;
    name ? res.redirect('/index') : res.render('hello');
});
// returns Welcome {student} after name has been submitted
 router.post('/hello', (req, res ) => {
    res.cookie('username', req.body.username);
    res.redirect('/'); 
});


// goodbye route, redirects user after clicking goodbye button

router.post('/goodbye',(req, res) => {
    res.clearCookie('username');
    res.redirect('/hello')
});

module.exports = router;