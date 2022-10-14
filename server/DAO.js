'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { Resolver } = require('dns/promises');
const { Timer } = require('./Timer');

const db = new sqlite.Database('riddleDB.db', (err) => {
  if (err) {
    throw err;
  }
});

/************AUTHENTICATION QUERY***********/ //

//4.1 STEP PASSPORT-->Check credentials and HASHING PASSWORD with Node's crypto modules
function getUser(email, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM USERS WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      }
      else if (row === undefined) {
        resolve(false);
      }
      else {
        const user = { id: row.id, username: row.email, name: row.name, user_score: row.user_score }; //NOTA BENE-->QUI NON DOBBIAMO METTERE LA PASSWORD!!-->vedi dopo perchè dobbiamo salvarla come HASH

        //4.2 STEP PASSPORT-->HASHING PASSWORD
        crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
          if (err) reject(err);
          //4.3 STEP PASSPORT-->CHECK IF HASHED PASSWORD==STORED PASSWORD
          if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);//Adesso ritorna al "server.js" per verificare come funziona il return cb(null,user)
        });
      }
    });
  });
};

//getUserById
function getUserById(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      else if (row === undefined) {
        resolve({ error: 'User not found!' });
      }
      else {
        const user = { id: row.id, username: row.email, name: row.name, score: row.user_score };
        resolve(user);
      }
    });
  });
};

/*************RIDDLES FUNCTIONS************/

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

/*************TIMERS FUNCTIONS************/

//readTimers
function readTimers() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM TIMERS';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map((timer) => new Timer(timer.id_riddle, timer.timestamp)));
      }
    });
  });
}

//addTimer
function addTimer(timer) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO TIMERS (id_riddle, timestamp) VALUES(?,?)';
    db.run(sql, timer.id_riddle, timer.timestamp, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

/*************ANSWERS FUNCTIONS************/

//readRiddleAnswers
function readRiddleAnswers(riddle) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ANSWERS WHERE id_riddle = ?';
    db.all(sql, riddle, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

//addAnswer
function addAnswer(answer) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ANSWERS (id_user, id_riddle, answer, is_correct) VALUES(?,?,?,?)';
    db.run(sql, answer.id_user, answer.id_riddle, answer.answer, answer.is_correct, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

/*************USERS FUNCTIONS************/

//readUsersScore
function readUsersScore() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name, user_score FROM USERS ORDER BY user_score DESC';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
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
      else if(rows === undefined)
        resolve(false);
      else 
        resolve(rows);
    })
  })
}

//increaseScore
function increaseScore(user, newScore) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET user_score = user_score + ? where id = ?';
    db.run(sql, newScore, user, (err, rows) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
}

module.exports = { getUser, getUserById, readRiddles, addRiddle, increaseScore, addAnswer, updateRiddleStatus, readRiddleAnswers, getWinner, readUsersScore, addTimer, readTimers };
