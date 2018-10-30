const express = require('express');
const hbs = require('express-handlebars');
const http = require('http');
const https = require('https');
const fs = require('fs');

const routes = require('./routes/routes');

// Certificate
const privateKey = fs.readFileSync('encryption/key.pem');
const certificate = fs.readFileSync('encryption/cert.pem');
const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: 'preet1234'
};

const app = express();

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');


app.use('/', routes);

//Redirect to HTTPS
app.use(function(req, res, next) {
  if (req.secure) {
      next();
  } else {
      res.redirect('https://' + req.headers.host + req.url);
  }
});


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});