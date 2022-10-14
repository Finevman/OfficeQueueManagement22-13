import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Alert } from 'react-bootstrap';
import API from "./API";
import { Login } from "./Login";
import NavBar from "./NavBar";
import NavBarGuest from "./NavBarGuest";
import Main from "./Main";
import AddRiddleForm from "./AddRiddleForm";


function App() {

  /************AUTHENTICATION VARIABLES*****************/

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [currentU, setCurrentU] = useState({});

  //*******CHECK_AUTH*******//
  useEffect(() => {
    const checkAuth = async () => {
      const user_curr = await API.getUserInfo(); // we have the user info here
      user_curr.name === 'Guest' ? setLoggedIn(false) : setLoggedIn(true);
      setCurrentU(user_curr);
    };
    checkAuth();
  }, [loggedIn]);
  //***********************//

  //********HANDLE_LOGIN*******//
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setCurrentU(user);
      setUserFilter(false);

      setMessage({ msg: `Welcome ${user.name}`, type: 'success' });
    } catch (err) {
      if (err === 'Unauthorized') {
        setMessage({ msg: "Incorrect username or password", type: 'danger' });
      } else {
        setMessage({ msg: "Server problem, please try again or contact assistance", type: 'danger' });
      }
    }
  };
  //*****************************//

  //********HANDLE_LOGOUT*******//
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);

    //BEST PRACTISE after Logout-->Clean up everything!
    setCurrentU({});
    setUserFilter(false);
    setMessage('');
  };

  /*****************************************************/

  const [riddles, setRiddles] = useState([]);
  const [userFilter, setUserFilter] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoreUpdate, setScoreUpdate] = useState(false);
  const [timerArray, setTimerArray] = useState([]);

  async function readUsersScore() {
    try {
      const userList = await API.readUsersScore();
      setLeaderboard(userList);
    } catch (e) {
      console.log("Error in readUsersScore: ", e);
    }
  }

  async function readRiddles() {
    try {
      const riddleList = await API.readRiddles();
      await API.readTimers();
      setRiddles(riddleList);
    } catch (e) {
      console.log("Error in readRiddles: ", e);
    }
  }

  async function getTimerArray() {
    try {
      const list = await API.getTimerArray();
      setTimerArray(list);
    } catch (e) {
      console.log("Error in getTimerArray: ", e);
    }
  }

  const addRiddle = async (riddle) => {
    try {
      await API.addRiddle(riddle);
      readRiddles();
    } catch (e) {
      console.log("Error in adRiddle: ", e);
    }
  }

  useEffect(() => {
    getTimerArray();
    readRiddles();
    readUsersScore();
  }, [currentU])

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            !loggedIn ?
              <>
                <NavBarGuest message={message} setMessage={setMessage} loggedIn={loggedIn} />
                <Main riddles={riddles} user={currentU} userFilter={userFilter} readUsersScore={readUsersScore} leaderboard={leaderboard} timerArray={timerArray} scoreUpdate={scoreUpdate} setScoreUpdate={setScoreUpdate} />
              </>
              :
              <>
                <Navigate replace to='/user' />
              </>
          }
          />

          <Route path='/user' element={
            loggedIn ?
              <>
                <NavBar user={currentU.name} loggedIn={loggedIn} logout={handleLogout} userFilter={userFilter} setUserFilter={setUserFilter} />
                <Main riddles={riddles} user={currentU} userFilter={userFilter} readUsersScore={readUsersScore} leaderboard={leaderboard} timerArray={timerArray} scoreUpdate={scoreUpdate} setScoreUpdate={setScoreUpdate} />
              </>
              :
              <>
                <Navigate replace to='/' />
              </>
          }
          />

          <Route path='/user/riddles' element={
            loggedIn ?
              <>
                <NavBar user={currentU.name} loggedIn={loggedIn} logout={handleLogout} userFilter={userFilter} setUserFilter={setUserFilter} />
                <Main riddles={riddles} user={currentU} userFilter={userFilter} readUsersScore={readUsersScore} leaderboard={leaderboard} timerArray={timerArray} scoreUpdate={scoreUpdate} setScoreUpdate={setScoreUpdate} />
              </>
              :
              <>
                <Navigate replace to='/' />
              </>
          }
          />

          <Route path='/login' element={
            loggedIn ?
              <Navigate replace to='/' />
              :
              <>
                {message &&
                  <Row>
                    <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
                  </Row>
                }
                <Login login={handleLogin} />
              </>
          }
          />

          <Route path='/user/addRiddle' element={
            loggedIn ?
              <AddRiddleForm user={currentU.id} addRiddle={addRiddle} />
              :
              <Navigate replace to='/' />
          }
          />

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
