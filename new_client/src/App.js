import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Box } from "@material-ui/core";

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
import ProtectedRoute from "./ProtectedRoute";
import AlumniPage from "./components/alumni/AlumniPage";

function App() {
  const store = configureStore();
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <Box
          display="flex"
          flexDirection="column"
          className="App"
          style={{
            position: "relative",
            minHeight: "100vh",
          }}
        >
          <Box>
            <Header />
          </Box>

          <Box flexGrow={1} style={{ marginBottom: "auto", minHeight: "80vh" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route exact path="/blogs" render={() => <Blogs />} />
              <Route path="/signin" component={Signin} />
              <Route path='/reset' component={ResetPw} />
              <Route path='/newpass/:token' component={NewPw} />
              <ProtectedRoute exact path="/addblog" component={AddBlog} />
              <Route path="/blogs/:id" component={IndividualBlog} />
              <ProtectedRoute path="/blog/edit/:id" component={AddBlog} />
              <Route path="/signup" component={Signup} />
              <Route
                path="/glimpse/:header"
                render={(prevProps) => (
                  <IndividualImageGalllery {...prevProps} />
                )}
              />
              <Route path="/glimpse" component={Glimpse} />
              <Route path="/events" component={EventList} />
              <ProtectedRoute path="/addevent" component={AddEvent} />
              <ProtectedRoute path="/event/edit/:id" component={AddEvent} />
              <Route path="/resources" component={ResourcePage} />
              <Route path="/alumni" component={AlumniPage} />
            </Switch>
          </Box>

          <Box>
            <Footer />
          </Box>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
