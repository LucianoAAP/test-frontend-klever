import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, AddToken, EditToken } from './pages';
import './App.css';

const App = () => (
  <Routes>
    <Route exact path="/add" element={ <AddToken /> } />
    <Route exact path="/edit" element={ <EditToken /> } />
    <Route exact path="/" element={ <Home /> } />
  </Routes>
);

export default App;
