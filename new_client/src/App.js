import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// Components begin here
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/pages/About";
import Glimpse from "./components/glimpses/Glimpse";

import Blogs from "./components/blogs/Blog";
import AddBlog from "./components/blogs/AddBlog";
import IndividualBlog from "./components/blogs/IndividualBlog";

import Signin from "./components/auth/Signin.jsx";
import Signup from "./components/auth/Signup.jsx";
import AddEvent from "./components/events/AddEvent";
import EventList from "./components/events/EventList";
import IndividualImageGalllery from "./components/glimpses/IndividualImageGalllery";

import ResetPw from './components/auth/ResetPw'
import NewPw from './components/auth/NewPw'
import ResourcePage from "./components/resources/ResourcePage";

function App() {
  const store = configureStore();
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <div
          className="App"
          style={{
            position: "relative",
            minHeight: "100vh",
            paddingBottom: "250px",
          }}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/blogs" render={() => <Blogs key={window.location} />} />
            <Route path="/signin" component={Signin} />

            <Route path='/reset' component={ResetPw} />
            <Route path='/newpass/:token' component={NewPw} />

            <Route exact path="/addblog" component={AddBlog} />
            <Route path="/blog/:id" component={IndividualBlog} />
            <Route path="/blog/edit/:id" component={AddBlog} />
            <Route path='/blogs?tag=:tag' render={() => <Blogs key={window.location} />} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/glimpse/:header"
              render={(prevProps) => <IndividualImageGalllery {...prevProps} />}
            />
            <Route path="/glimpse" component={Glimpse} />
            <Route path="/events" component={EventList} />
            <Route path="/addevent" component={AddEvent} />
            <Route path="/event/edit/:id" component={AddEvent} />
            <Route path="/resources" component={ResourcePage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
