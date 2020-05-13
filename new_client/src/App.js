import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header.js"
import Home from './components/Home/home.js';
import Footer from './components/Footer.js'
import About from './components/pages/About.jsx';
import Auth from './components/auth/Auth';
import Glimpse from './components/glimpses/Glimpse';
import axios from 'axios';
import Blogs from './components/blogs/Blog.jsx';
import Addblog from './components/blogs/Addblog';
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_GETBLOGS)
      .then(res => setPosts(res.data))
      .catch(error => console.log(error));
  });
  return (
    <Router>
      <div className="App">
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/blogs" render={() => <Blogs posts={posts} />} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/addblog" component={Addblog} />

        <Route path="/glimpse" component={Glimpse} />
        {/* <Footer /> */}



      </div>

    </Router>
  );
}

export default App;

