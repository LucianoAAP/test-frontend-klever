import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import { Home, AddToken, EditToken } from './pages';
import './App.css';

const App = () => (
  <Provider>
    <Routes>
      <Route exact path="/add" element={ <AddToken /> } />
      <Route exact path="/edit/:id" element={ <EditToken /> } />
      <Route exact path="/" element={ <Home /> } />
    </Routes>
  </Provider>
);

export default App;
