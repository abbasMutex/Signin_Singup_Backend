import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const setAuth=boolean=>{
    setIsAuthenticate(boolean);
  }
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
