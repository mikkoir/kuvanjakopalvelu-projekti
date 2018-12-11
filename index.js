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
const cookieParser = require('cookie-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const saltRounds = 10;
const database = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const multer = require('multer');
const upload = multer({dest: 'public/files/'});

app.use(cookieParser());


/*
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};
*/

app.use(express.static('public'));


app.use(session({
  secret: 'keyboard LOL cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));

// create the connection to database
const connection = database.connect();


// testataan toimiiko tietokanta
database.select(connection, (results) => {
  console.log(results);
});

const insertToDATAB =(data, next)=>{
  database.insert(data, connection, () => {
    next();
  });
};

const selectAll = (req, next) => {
  database.select(connection, (results) => {
    req.custom = results;
    next();
  });
};

const selectRating = (req, next) => {
  database.rating(connection, (results) => {
    req.custom = results;
    next();
  });
};

const selectFavourite = (req, next) => {
  database.selectFav(connection, (results) => {
    req.custom = results;
    next();
  });
};

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('{"error": "Not logged in!"}');
  }
};


passport.serializeUser((user, done) => {
  console.log('serialize: ',  user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Here we go: ' + username);
      // let res = null;

      const doLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          database.login([username, password], connection, (result) => {

            // res == true
            if (result) {
              resolve(result);
            } else {
              reject();
            }
          });
        });
      };

      return doLogin(username, password).then((result) => {
        if (result.length < 1) {
          console.log('undone');
          return done(null, false);
        } else {
          console.log('done');
          result[0].password = ''; // remove password from user's data
          return done(null, result[0]); // result[0] is user's data, accessible as req.user
        }
      }).catch(() => {
        return done(null, false);
      });
    },
));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) { // if login not happening
      console.log('Login failed');
      return res.redirect('/front.html');
    }
    req.logIn(user, (err) => {
      // send userID as cookie:
      res.cookie('user_ID', req.user.user_ID);
      if (err) {
        return next(err);
      }
      return res.redirect('/user.html'); // if login succesful
    });
  })(req, res, next);
});

app.post('/accCreate', (req, res, next) => {
  console.log('bodi', req.body);
  if (req.body.psw === req.body.repsw) {
    const data = [
      req.body.uname,
      req.body.psw,
      req.body.email,
    ];
    database.newUser(data, connection, (result) => {
      res.send(result);
    });
    return res.redirect('/front.html');
  }
  else {
    console.log('womble is a faggot');
    return res.redirect('/front.html');
  }
});

app.get('/logout', function(req, res) {
  res.cookie('user_ID', 0);
  req.logout();
  console.log('great success')
  res.redirect('./front.html');
});

app.get('/', (req, res) => {
  // check for https
  console.log('/', req.user);
  // if (req.secure) {
    console.log('req.user', req.user);
    // if user is not logged
    if (req.user !== undefined) {
      res.redirect(301, 'user.html');
    } else {
      res.redirect(301, 'front.html');
    }
  //} else {
    // if not https
  //  res.send('{"status": "not https"}');
  // }
});

app.get('/checkLogin', (req, res) => {
  if(req.user){
    res.send('{"status":1 }');
  }
  else{
    res.send('{"status":0 }');
  }
});
app.use(express.static('public'));
// serve node_modules
app.use('/modules', express.static('node_modules'));

// tallenna tiedosto
app.post('/upload', upload.single('kuva'), (req, res, next) => {
  console.log('req', req);
  console.log(req.body);
  console.log('useri', req.user);
  next();
});

/*
// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
      './public/thumbs/' + req.file.filename +'_thumb').then(() => {
    next();
  });
});
*/

// tallenna tiedot tietokantaan
app.use('/upload', (req, res, next) => {
  const data = [
    req.body.tag,
    req.body.title,
    req.user.user_ID,
    req.file.filename,
    req.file.filename+'_thumb',
    req.file.mimetype,
  ];
  insertToDATAB(data, next);
});

// hae päivitetyt tiedot tietokannasta
app.use('/upload', (req, res, next) => {
  selectAll(req, next);
});

// lähetä tiedot selaimeen
app.use('/upload', (req, res) => {
  res.send(req.custom);
});

app.get('/images',(req, res) => {
  database.select(connection, (results)=>{
    res.send(results);
  });
});

app.get('/uimg', loggedIn, (req, res) => {
  const data = req.user.user_ID;
  database.selectUimg(data, connection, (results)=>{
    res.send(results);
  });
});

/*
app.get('/test', (req,res) => {
  if (req.secure) res.send('https :)');
  else res.send('hello not secure?');
});
*/



app.listen(8000); //normal http traffic
// https.createServer(options, app).listen(3000); //https traffic

