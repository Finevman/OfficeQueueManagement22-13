'use strict';

// structure left for references

const sqlite = require('sqlite3');
const { Resolver } = require('dns/promises');

const db = new sqlite.Database('oqm.db', (err) => {
  if (err) {
    throw err;
  }
});

/*************userS FUNCTIONS************/
function readUsers() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM USERS';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO USERS (name, lastname, email, password, salt, role) VALUES(?,?,?,?,?,?)';
    db.run(sql, user.name, user.lastname, user.email, user.password, user.salt, user.role, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

//update role
function updateUserRole(id, role) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET role = ? where id = ?';
    db.run(sql, role, id, (err, rows) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM USERS WHERE id = ?';
    db.run(query, id, (err) => {
      if (err) {
        reject(err);
      } else
        resolve(true);
    });
  });
};


/*

//getWinner
function getWinner(user) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM USERS, ANSWERS WHERE id_user = id and id_user = ? and is_correct = 1';
    db.get(sql, user, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        resolve(false);
      else
        resolve(rows);
    })
  })
}

module.exports = { readusers };
*/
