import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Map from './components/Map';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/home' element={<Main /> }  />
        <Route path='/login' element={<Login />}/>
        <Route path='/map' element={<Map />}/>
      </Routes>
    </Router>
  );
}

export default App;
