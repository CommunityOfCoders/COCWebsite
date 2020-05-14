import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Header from "./components/Header.js"
import Home from './components/Home/home.js';
import Footer from './components/Footer.js'
import About from './components/pages/About.jsx';
import Glimpse from './components/glimpses/Glimpse';
import axios from 'axios';
import Blogs from './components/blogs/Blog.jsx';
import Addblog from './components/blogs/Addblog';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Signin from './components/auth/Signin.jsx';
import Signup from './components/auth/Signup.jsx';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_GETBLOGS)
      .then(res => setPosts(res.data))
      .catch(error => console.log(error));
  });

  const store = configureStore();
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/blogs" render={() => <Blogs posts={posts} />} />
          <Route path="/signin" component={Signin} />
          <Route exact path="/addblog" component={Addblog} />
          <Route path="/signup" component={Signup} />

          <Route path="/glimpse" component={Glimpse} />
          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>

  );
}

export default App;

