import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

import React, { useState, useEffect, useContext, } from 'react';
import { Container, Toast} from 'react-bootstrap/';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { DefaultLayout, LoginLayout, LoadingLayout } from './components/PageLayout';
import { Navigation } from './components/Navigation';
import { ServicesContainer } from './components/serviceCards';

import MessageContext from './messageCtx';
import API from './API';

function App() {

  const [message, setMessage] = useState('');
  const [services, setServices] = useState([])

  const ieServices = [{ServiceName:'Contabilidad', AverageTime:5}, //Dummy object <---------------------------------
                      {ServiceName:'Servicio al cliente', AverageTime:10},
                      {ServiceName:'Ventas', AverageTime:15}]; 

  //*******Initial query*******//
  useEffect(() => {
    async function fetchServices() {
      // const fetchedServices = await API.getServices();
      // setServices(fetchedServices);
      setServices(ieServices)
    }
    fetchServices();
  }, []);

  // If an error occurs, the error message will be shown in a toast.
  const handleMessages = (msg) => {
    console.log(msg)
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
    console.log(message)
  }

  return (
    <BrowserRouter>
      <MessageContext.Provider value={message}>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/serviceCards" element={<ServicesContainer services={services}/>} />
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
const [currentU, setCurrentU] = useState({});
const [message, setMessage] = useContext(MessageContext);
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
    console.log(err)
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
         <DefaultLayout />
      } >
      </Route>
      <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />
    </Routes>
  </>
);
}

export default App;
