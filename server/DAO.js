'use strict';

// structure left for references

const sqlite = require('sqlite3');
const { Resolver } = require('dns/promises');

const db = new sqlite.Database('oqm.db', (err) => {
  if (err) {
    throw err;
  }
});

/*************RIDDLES FUNCTIONS************/
/*
//readRiddles
function readRiddles() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM RIDDLES';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

//addRiddle
function addRiddle(riddle) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO RIDDLES (question, difficulty, duration, correct_answer, hint_1,hint_2,status_riddle,user_id) VALUES(?,?,?,?,?,?,?,?)';
    db.run(sql, riddle.question, riddle.difficulty, riddle.duration, riddle.correct_answer, riddle.hint_1, riddle.hint_2, riddle.status_riddle, riddle.user_id, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

//updateRiddleStatus
function updateRiddleStatus(id, status) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE riddles SET status_riddle = ? where id = ?';
    db.run(sql, status, id, (err, rows) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
}



//getWinner
function getWinner(riddle) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM USERS, ANSWERS WHERE id_user = id and id_riddle = ? and is_correct = 1';
    db.get(sql, riddle, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        resolve(false);
      else
        resolve(rows);
    })
  })
}

module.exports = { readRiddles };
*/
