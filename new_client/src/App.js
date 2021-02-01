import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Box } from "@material-ui/core";
import ProtectedRoute from "./ProtectedRoute";

// Components begin here
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Glimpse from "./components/glimpses/Glimpse";
import AddBlog from "./components/blogs/AddBlog";
import Signin from "./components/auth/Signin.jsx";
import Signup from "./components/auth/Signup.jsx";
import AddEvent from "./components/events/AddEvent";
import IndividualImageGalllery from "./components/glimpses/IndividualImageGalllery";
import ResetPw from "./components/auth/ResetPw";
import NewPw from "./components/auth/NewPw";
import Spinner from "./components/spinner/Spinner";

// Lazy components start here
const LazyHome = lazy(() => import("./components/Home/Home"));
const LazyAbout = lazy(() => import("./components/pages/About"));
const LazyBlogs = lazy(() => import("./components/blogs/Blog"));
const LazyIndividualBlog = lazy(() =>
  import("./components/blogs/IndividualBlog")
);
const LazyEventList = lazy(() => import("./components/events/EventList"));
const LazyResourcePage = lazy(() =>
  import("./components/resources/ResourcePage")
);
const LazyProjectList = lazy(() => import("./components/projects/ProjectList"));
const LazyProjects = lazy(() => import("./components/projects/Projects"));
const LazyAlumniPage = lazy(() => import("./components/alumni/AlumniPage"));

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
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/" component={LazyHome} />
                <Route path="/about" component={LazyAbout} />
                <Route exact path="/blogs" render={() => <LazyBlogs />} />
                <Route path="/signin" component={Signin} />
                <Route path="/reset" component={ResetPw} />
                <Route path="/newpass/:token" component={NewPw} />
                <ProtectedRoute exact path="/addblog" component={AddBlog} />
                <Route path="/blogs/:id" component={LazyIndividualBlog} />
                <ProtectedRoute path="/blog/edit/:id" component={AddBlog} />
                <Route
                  path="/blogs?tag=:tag"
                  render={() => <LazyBlogs key={window.location} />}
                />
                <Route path="/signup" component={Signup} />
                <Route
                  path="/glimpse/:header"
                  render={(prevProps) => (
                    <IndividualImageGalllery {...prevProps} />
                  )}
                />
                <Route path="/glimpse" component={Glimpse} />
                <Route path="/events" component={LazyEventList} />
                <ProtectedRoute path="/addevent" component={AddEvent} />
                <ProtectedRoute path="/event/edit/:id" component={AddEvent} />
                <Route path="/resources" component={LazyResourcePage} />
                <Route path="/projects/:id" component={LazyProjectList} />
                <Route path="/projects" component={LazyProjects} />
                <Route path="/alumni" component={LazyAlumniPage} />
              </Switch>
            </Suspense>
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
