import React from 'react';

import './App.css';

// Imports of pages
import Header from "./components/Header.js"
import Home from './components/Home/home.js';
import Footer from './components/Footer.js'


function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Footer/>
=======
import Auth from "./auth/Auth";
function App() {
  return (
    <div className="App">
      <Auth/>
    </div>
  );
}

export default App;

