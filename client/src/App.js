import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Alert } from 'react-bootstrap';
import API from "./API";


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



  return (
    
    <p>We are working for you</p>

  );
}

export default App;
