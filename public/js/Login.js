'use strict';
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./modules/database');
const connection = db.connect();

passport.serializeUser((user, done) => {
  console.log('serialize: ' + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({
  secret: 'keyboard LOL cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true},
}));

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Here we go: ' + username);
      let res = null;

      const doLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          db.login([username, password], connection, (result) => {
            console.log('result', result.length);
            resolve(result);
          });
        });
      };

      return doLogin(username, password).then((res) => {
        if (res.length < 1) {
          console.log('undone');
          return done(null, false);
        } else {
          console.log('done');
          return done(null, {username: username});
        }
      });

    },
));

const adduser = (req, res, send) =>{
  database.newUser(data, connection, () =>{
    next();
  })
};



app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local',
        {successRedirect: '/node/', failureRedirect: '/node/login.html'}));

app.set('trust proxy');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert,
};

app.get('/', (req, res) => {
  if (req.secure) {
    console.log('req.user', req.user);
    if (req.user !== undefined) res.send('Hello ' + req.user.username);
    else res.redirect(301, './login.html');
  }
  else res.send('hello not secure?');
});

//app.listen(8000);
http.createServer((req, res) => {
  const redir = 'https://' + req.headers.host + '/node' + req.url;
  console.log('redir', redir);
  res.writeHead(301, {'Location': redir});
  res.end();

  app.use('/accCreate', (req, res, next)=>{
    const data = [
        req.body.user_ID,
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.join_date,
    ];
    adduser(data,res,next);
  });

}).listen(8000);
https.createServer(options, app).listen(3000);