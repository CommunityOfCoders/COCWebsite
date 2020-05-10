import React from 'react';

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
    </div>
  );
}

export default App;

