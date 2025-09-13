import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/home' element={<Sidebar/> }  />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
