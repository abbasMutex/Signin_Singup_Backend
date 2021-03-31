import React, {useState, useEffect} from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import {toast }  from 'react-toastify';

toast.configure();
function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const setAuth=boolean=>{
    setIsAuthenticate(boolean);
  }

  async function isAuth(){
      try {
        const response = await fetch("http://localhost:5000/auth/verify", {
          method:"GET",
          headers:{token: localStorage.token}
        });
        const data = await response.json();
       
        data === true ? setIsAuthenticate(true) :
        setIsAuthenticate(false);
      } catch (error) {
        console.error(error.message);
      }
  }

  useEffect(() => {
    isAuth();
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticate ? (<Login setAuth={setAuth}/>): (<Navigate to="/dashboard"/>)}/>
        <Route path="/register" element={!isAuthenticate ? (<Register setAuth={setAuth}/>): (<Navigate to="/login" />)}/>
        <Route path="/dashboard" element={isAuthenticate ? (<Dashboard setAuth={setAuth}/>): (<Navigate to="/login"/>)}/>
      </Routes>
    </Router>
  );
}

export default App;
