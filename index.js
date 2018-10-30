const express = require('express');
const hbs = require('express-handlebars');

const routes = require('./routes/routes');

const app = express();

app.engine('hbs' , hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');


app.use('/', routes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });