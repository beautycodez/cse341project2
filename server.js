const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-key'
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
next();
})
app.use('/', require('./routes'));

mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    }else {
        app.listen(port, () => {console.log(`Database is listening and node is Running on port ${port}`)})
    }
})
