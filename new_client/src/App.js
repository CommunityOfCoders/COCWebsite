import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Box } from "@material-ui/core";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Spinner from "./components/spinner/Spinner";

// To be removed.
import Glimpse from "./components/glimpses/Glimpse";
import IndividualImageGalllery from "./components/glimpses/IndividualImageGalllery";

// Lazy components start here

// Auth
const LazySignin = import("./components/auth/Signin.jsx");
const LazySignup = import("./components/auth/Signup.jsx");
const LazyResetPw = import("./components/auth/ResetPw");
const LazyNewPw = import("./components/auth/NewPw");

// Pages
const LazyHome = lazy(() => import("./components/Home/Home"));
const LazyAbout = lazy(() => import("./components/pages/About"));
const LazyResourcePage = lazy(() =>
  import("./components/resources/ResourcePage")
);
const LazyProjectList = lazy(() => import("./components/projects/ProjectList"));
const LazyProjects = lazy(() => import("./components/projects/Projects"));

// Blogs
const LazyBlogs = lazy(() => import("./components/blogs/Blog"));
const LazyIndividualBlog = lazy(() =>
  import("./components/blogs/IndividualBlog")
);
const LazyAddBlog = lazy(() => import("./components/blogs/AddBlog"));

// Events
const LazyEventList = lazy(() => import("./components/events/EventList"));
const LazyAddEvent = import("./components/events/AddEvent");

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
                <Route path="/signin" component={LazySignin} />
                <Route path="/reset" component={LazyResetPw} />
                <Route path="/newpass/:token" component={LazyNewPw} />
                <ProtectedRoute exact path="/addblog" component={LazyAddBlog} />
                <Route path="/blogs/:id" component={LazyIndividualBlog} />
                <ProtectedRoute path="/blog/edit/:id" component={LazyAddBlog} />
                <Route path="/signup" component={LazySignup} />
                <Route
                  path="/glimpse/:header"
                  render={(prevProps) => (
                    <IndividualImageGalllery {...prevProps} />
                  )}
                />
                <Route path="/glimpse" component={Glimpse} />
                <Route path="/events" component={LazyEventList} />
                <ProtectedRoute path="/addevent" component={LazyAddEvent} />
                <ProtectedRoute
                  path="/event/edit/:id"
                  component={LazyAddEvent}
                />
                <Route path="/resources" component={LazyResourcePage} />
                <Route path="/projects/:id" component={LazyProjectList} />
                <Route path="/projects" component={LazyProjects} />
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
