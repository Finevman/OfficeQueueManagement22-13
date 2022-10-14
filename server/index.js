'use strict';

const express = require('express');
const dao = require('./DAO');
const cors = require('cors');
const morgan = require('morgan'); // logging middleware
const { validationResult, body, param } = require('express-validator');
const PREFIX = '/api/v36';

const dayjs = require('dayjs');

//1 STEP PASSPORT-->Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
//5 STEP EXPRESS-SESSION-->Express-session related imports
const session = require('express-session');
const { Timer } = require('./Timer');
const { Riddle } = require('./Riddle');
const { Answer } = require('./Answer');

const app = express();
// set up the middlewares
app.use(morgan('dev'));
app.use(express.json());

//corsOptions
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));



//2 STEP PASSPORT-->Passport: set up local strategy-->TODO in USER-DAO
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  //4 STEP PASSPORT-->getUser in the verify method-->vedi come implemento "getUser" nel "userDao"
  const user = await dao.getUser(username, password)

  //4.4 STEP PASSPORT-->CALLBACK cb check if returned "user" is correct or not
  if (!user)
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user);
}));

//7 STEP EXPRESS-SESSION-->Express-sessioN-->Session Personalization
passport.serializeUser(function (user, cb) {
  cb(null, user);
});


passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized because not logged in' });
}

//6 STEP EXPRESS-SESSION-->Express-sessio installed on Passport
app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
//3/6.1 STEP PASSPORT/EXPRESS-->Install in our application the local strategy of Passport and Express-Session-->app.use(...)
app.use(passport.authenticate('session'));


//**************************************API***************/


/*************RIDDLES API************/

//readRiddles------------------------------------------------
app.get(PREFIX + '/riddles', (req, res) => {
  dao.readRiddles().then(
    (value) => {
      res.json(value);
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//addRiddle-----------------------------------------------------------------------
app.post(PREFIX + '/riddles/addRiddle', isLoggedIn, [
  //BODY PARAMS VALIDATION ADD
  body('question').not().isEmpty(),
  body('difficulty').not().isEmpty(),
  body('duration').not().isEmpty(),
  body('correct_answer').not().isEmpty(),
  body('hint_1').not().isEmpty(),
  body('hint_2').not().isEmpty(),
  body('status_riddle').not().isEmpty()], async (req, res) => {

    //VALIDATOR & CHECK ERRORS ADD
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //TRY-CATCH ADD
    const riddle = { ...req.body, user_id: req.user.id };
    try {
      const value = await dao.addRiddle(riddle);
      res.end();
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

//updateRiddleStatus----------------------------------------------------
app.put(PREFIX + '/riddles/updateRiddleStatus/:id/:status', isLoggedIn, async (req, res) => {

  //TRY-CATCH ADD
  try {
    const value = await dao.updateRiddleStatus(req.params.id, req.params.status);
    res.end();
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

/*************TIMERS API************/

let timerArray = [] // {id: , timer: , timestamp: }
let currentTimers = []; // new Timer

//readTimers------------------------------------------------
app.get(PREFIX + '/timers/readTimers', (req, res) => {
  dao.readTimers().then(
    (value) => {
      value.map((timer) => currentTimers.push(new Timer(timer.id_riddle, timer.timestamp)));
      res.end();
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//getTimerArray------------------------------------------------
app.get(PREFIX + '/timers/timerArray', (req, res) => {

  timerArray = [];

  dao.readRiddles().then(
    (value) => {

      const riddleList = value.map((riddle) => ({ id: riddle.id, duration: riddle.duration, status_riddle: riddle.status_riddle }));

      for (let riddle of riddleList) {

       
        if (riddle.status_riddle !== 'C') {
          if (riddle.status_riddle === 'O') {

            function checkTimer(id) {
              function checkTimerID(timer) {
                return timer.id == id;
              }

              let v;
              if (timerArray.length !== 0)
                v = timerArray.find(checkTimerID);

              return v !== undefined;
            }

            if (!checkTimer(riddle.id))
              timerArray.push({ id: riddle.id, timer: riddle.duration, timestamp: "" });
          }
          else {  //Riddle in R

            const time = currentTimers.find((v) => v.id_riddle === riddle.id).timestamp;
            const timeDayjs = dayjs(time);
            const now = dayjs();

            const difference = now.diff(timeDayjs, 'second');


            if (difference < riddle.duration)
              timerArray.push({ id: riddle.id, timer: riddle.duration - difference, timestamp: time });
            else
              dao.updateRiddleStatus(riddle.id, 'C');

          }
        }
      }

      res.json(timerArray);
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//addTimer-----------------------------------------------------------------------
app.post(PREFIX + '/timers/addTimer', isLoggedIn, [
  //BODY PARAMS VALIDATION ADD
  body('id_riddle').not().isEmpty(),
  body('timestamp').not().isEmpty()], async (req, res) => {

    //VALIDATOR & CHECK ERRORS ADD
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //TRY-CATCH ADD
    const timer = req.body;
    try {
      const value = await dao.addTimer(timer);
      res.end();
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

/*************ANSWERS API************/

//readRiddleAnswers---------------------------------------------------------------
app.get(PREFIX + '/answers/readRiddleAnswers/:riddle_id', isLoggedIn, (req, res) => {
  dao.readRiddleAnswers(req.params.riddle_id).then(
    (value) => {
      res.json(value);
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//addAnswer-----------------------------------------------------------------------
app.post(PREFIX + '/answers/addAnswer', isLoggedIn, [
  //BODY PARAMS VALIDATION ADD
  body('id_riddle').not().isEmpty(),
  body('answer').not().isEmpty(),
  body('is_correct').not().isEmpty()], async (req, res) => {

    //VALIDATOR & CHECK ERRORS ADD
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //TRY-CATCH ADD
    const answer = new Answer(req.user.id, req.body.id_riddle, req.body.answer, req.body.is_correct);
    try {
      const value = await dao.addAnswer(answer);
      res.end();
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

/*************USERS API************/

//readUsersScore------------------------------------------------
app.get(PREFIX + '/users/score', (req, res) => {
  dao.readUsersScore().then(
    (value) => {
      res.json(value);
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//getWinner---------------------------------------------------------------
app.get(PREFIX + '/users/winner/:id', isLoggedIn, (req, res) => {
  dao.getWinner(req.params.id).then(
    (value) => {
      res.json(value);
    }
  ).catch(
    (err) => {
      res.status(500).json({ error: err });
    }
  );
});

//IncreaseScore----------------------------------------------------
app.put(PREFIX + '/users/increaseScore/:newScore', isLoggedIn, async (req, res) => {

  //TRY-CATCH ADD
  try {
    const value = await dao.increaseScore(req.user.id, req.params.newScore);
    res.end();
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


//----------------------------------------------------//


//SESSION
app.post(PREFIX + '/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});


app.get(PREFIX + '/sessions/current', (req, res) => { 
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  else
    res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/v36/session/current
app.delete(PREFIX + '/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

//***************************************** */ 

//SERVER RUNNING
app.listen(3001, () => { console.log('Server running on Port: 3001') });
