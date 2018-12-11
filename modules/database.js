'use strict';
// get the client
const mysql = require('mysql2');

const connect = () => {

// create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM post ORDER BY post_ID DESC',
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};


const selectUimg = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM post WHERE user_ID = ? ORDER BY post_ID DESC',
      data,
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};


const selectTag = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM post WHERE tag = ?;',
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const rating = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM Rating WHERE boolean = 1;',
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const selectFav = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM Favourite;',
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};


const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO post (tag, title, user_ID, ufile, uthumb, mimetype) VALUES (?, ?, ?, ?, ?, ?) ',
      data,
      (err, results, fields) => {
        console.log(results); // results conta  ins rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};


const newUser = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO User (username, password, email) VALUES ( ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const login = (data, connection, callback) => {
  // simple query
  connection.execute(
      'SELECT * FROM User WHERE username = ? AND password = ?;',
      data,
      (err, results, fields) => {
        console.log('login res', results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};


module.exports = {
  connect: connect,
  select: select,
  newUser: newUser,
  insert: insert,
  rating: rating,
  selectFav: selectFav,
  login: login,
  selectUimg: selectUimg,
};