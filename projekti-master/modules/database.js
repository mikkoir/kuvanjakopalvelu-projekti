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
      'SELECT * FROM User;',
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO User (ufname, ulname, ufile, uthumb, mimetype) VALUES (?, ?, ?, ?, ?);',
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
  login:login,
};