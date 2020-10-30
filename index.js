// code adapted from here: https://www.npmjs.com/package/express-session
const express = require('express');
const session = require('express-session');

const app = express();

// Use the session middleware
app.use(session({ 
  key: 'demoSession',
  secret: 'a salty value', 
  resave: true,
  saveUninitialized: true,
  cookie: { 
    maxAge: 60000,
  },
}));
 
// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

const port = process.env.PORT || process.env.NODE_PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
