const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();
const {auth, requiresAuth} = require('express-openid-connect')

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization'
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
next();
})
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']}))
.use(cors({origin: '*'}))
app.use('/', require('./routes'));


mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    }else {
        app.listen(port, () => {console.log(`Database is listening and node is Running on port ${port}`)})
    }
})
