import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

import React, { useState, useEffect, useContext, } from 'react';
import { Container, Toast} from 'react-bootstrap/';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { DefaultLayout, LoginLayout, LoadingLayout } from './components/PageLayout';
import { Navigation } from './components/Navigation';

import MessageContext from './messageCtx';
import API from './API';

function App() {

  const [message, setMessage] = useState('');
  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

  return (
    <BrowserRouter>
      <MessageContext.Provider value={{ handleErrors }}>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide>
            <Toast.Body>{ message }</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
  ) 
}

function Main() {
/************AUTHENTICATION VARIABLES*****************/

const [loggedIn, setLoggedIn] = useState(false);
const [message, setMessage] = useState('');
const [currentU, setCurrentU] = useState({});

const location = useLocation();

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
    //setUserFilter(false);

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
//  setUserFilter(false);
  setMessage('');
};

/*****************************************************/

return (
  <>
    <Navigation logout={handleLogout} user={currentU} loggedIn={loggedIn} />

    <Routes>
      <Route path="/" element={
         <Navigate to="/login" replace state={location} />
      } >
      </Route>

      <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />
    </Routes>
  </>
);
}

export default App;
