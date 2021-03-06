const express = require('express');
const app = express();
const port = 3000;
const middleware = require('./middleware');
const path = require('path');
const server = app.listen(port, () => { 
    console.log(`Server is listening on ${port}`);
});

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// Router
const loginRoute = require('./routes/loginRoutes');
app.use('/login', loginRoute);

app.get('/', middleware.requireLogin, (req, res) =>{
    const payload = {
        pageTitle: 'Home'
    };
    res.status(200).render('home', payload);
})