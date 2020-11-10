const path = require('path');
const express = require('express');
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});