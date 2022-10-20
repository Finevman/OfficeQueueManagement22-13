import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

import React, { useState, useEffect, useContext, } from 'react';
import { Container, Toast } from 'react-bootstrap/';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { DefaultLayout, LoginLayout, AdminLayout, OfficerLayout } from './components/PageLayout';
import { Navigation } from './components/Navigation';
import { ServicesContainer } from './components/serviceCards';
import {Admin} from './components/admin'

import MessageContext from './messageCtx';
import API from './API';
<<<<<<< HEAD
import { Admin } from './components/admin';
=======
import { Button } from 'bootstrap';
>>>>>>> 9ae1c3e5d1c5bb2f8a9f620242f9677f4cee4639

let handleErrors; //MARTA'S COMMENT --> variable defined here because otherwise error at line 99

function App() {

  const [message, setMessage] = useState('');
<<<<<<< HEAD
  const [services, setServices] = useState([]);
  const [tickets, setTickets]= useState([]);

  const addTicketToGeneralQueue= (newTicket) =>{
    setTickets(tickets => [...tickets, newTicket])
  }

  handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
=======

  const handleErrors = (err) => {
    setMessage(err.error); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
>>>>>>> 9ae1c3e5d1c5bb2f8a9f620242f9677f4cee4639
  }

  //
<<<<<<< HEAD
  async function takeTicket(service) {
    if (typeof service === 'string') {
      try {
        const tId = await API.takeTicket(service)
        console.log(tId)
        setTickets()
      } catch (error) {
        handleErrors(error)
      }
    } else {
      handleErrors({ error: "Service must be a valid string" })
    }
  }

  // If an error occurs, the error message will be shown in a toast.
  const handleMessages = (msg) => {
    console.log(msg)
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
    console.log(message)
  }

=======
 //DO NOT IMPLEMENTS ROUTE HERE
>>>>>>> 9ae1c3e5d1c5bb2f8a9f620242f9677f4cee4639
  return (
    <BrowserRouter>
      <MessageContext.Provider value={{handleErrors}}>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
<<<<<<< HEAD
            <Route path="/serviceCards" element={<ServicesContainer services={services} takeTicket={takeTicket}/>} />
            <Route path="/officer" element={<Officer/>} />
=======
>>>>>>> 9ae1c3e5d1c5bb2f8a9f620242f9677f4cee4639
          </Routes>
          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
  )
}

function Main() {
  /************AUTHENTICATION VARIABLES*****************/

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentU, setCurrentU] = useState({});
  const location = useLocation();

  const {handleErrors} = useContext(MessageContext);

  //*******CHECK_AUTH*******//
  useEffect(() => {
    const checkAuth = async () => {
      try{
        const user_curr = await API.getUserInfo(); // we have the user info here
        user_curr.name === 'Guest' ? setLoggedIn(false) : setLoggedIn(true);
        setCurrentU(user_curr);
      }catch(err){
        handleErrors(err); // mostly unauthenticated user, thus set not logged in
        setCurrentU({});
        setLoggedIn(false);
      }
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

      //handleMessages({ msg: `Welcome ${user.name}`, type: 'success' });
    } catch (err) {
      throw err
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
    //setMessage('');
  };
  /*****************************************************/
  return (
    <>

    <Navigation logout={handleLogout} user={currentU} loggedIn={loggedIn} />

<<<<<<< HEAD
      <Routes>
        <Route path="/" element={
          //<DefaultLayout />
          //<Navigate to="/login" replace state={location} />  
          <Navigate to="/officer"/> //MARTA'S TEMPORARY COMMENT
        } >
        </Route>
        <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />

        <Route path="/officer" element={loggedIn ? <Officer /*user={currentU}*/ /> : <Navigate replace to='/' />} />

        <Route path="/admin" element={<Admin users={users} /*changeRole={changeRole}   //error: changeRole not defined *//>} />

      </Routes>
    </>
=======
    <Routes>
      <Route path="/" element={
        //DO NOT IMPLEMENTS ROUTES HERE, IN PageLayout.js THERE IS A LAYOUT PER EACH USER, 
        //USE THAT ONE TO IMPLEMENT FUNCTIONS
        //JUST PASS THE PROPS IF NEEDED HERE.
          loggedIn && currentU.role=='Officer' ? <OfficerLayout/> :
          loggedIn && currentU.role=='Admin' ? <AdminLayout/> :
         <DefaultLayout />
      } >
      </Route>
      <Route path="/login" element={!loggedIn ?  <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} /> 
            
    </Routes>
  </>
>>>>>>> 9ae1c3e5d1c5bb2f8a9f620242f9677f4cee4639

  );
}

export default App;
