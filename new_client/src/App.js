import React from 'react';
import { Provider } from "react-redux";
// Imports of pages
import Header from "./components/Header.js"
import Home from './components/Home/home.js';
import Footer from './components/Footer.js'
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;

