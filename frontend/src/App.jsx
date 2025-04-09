// src/App.jsx
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';

const App = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </div>
  );
};

export default App;
