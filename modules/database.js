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
      'SELECT * FROM wp_users;',
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



/*
const haeKuva = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT ufile FROM Pic WHERE pic_ID = ?;',
      (err, results, fields) => {
        //console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};
*/

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO wp_users (ufname, ulname, ufile, uthumb, mimetype) VALUES (?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insert2 = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO Pic (ufile, uthumb) VALUES (?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertPost = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO post (tag, title) VALUES (?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
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
  insert: insert,
  newUser: newUser,
  insert2: insert2,
  rating: rating,
  selectFav: selectFav,
  login: login,
};