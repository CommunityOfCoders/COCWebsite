import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import {
  Box,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Spinner from "./components/spinner/Spinner";
import ScrollToTop from "./components/Utilities/ScrollToTop";

// Lazy components start here
// Auth
const LazySignin = lazy(() => import("./components/auth/Signin"));
const LazySignup = lazy(() => import("./components/auth/Signup"));
const LazyResetPw = lazy(() => import("./components/auth/ResetPw"));
const LazyNewPw = lazy(() => import("./components/auth/NewPw"));

// Pages
const LazyHome = lazy(() => import("./components/Home/Home"));
const LazyAbout = lazy(() => import("./components/about-us/AboutUs"));
const LazyResourcePage = lazy(() =>
  import("./components/resources/ResourcePage")
);
const LazyRegisterEvent = lazy(() =>
  import("./components/events/RegisterEvent")
);
const LazyProjectList = lazy(() => import("./components/projects/ProjectList"));
const LazyProjects = lazy(() => import("./components/projects/Projects"));
const LazyAlumniPage = lazy(() => import("./components/alumni/AlumniPage"));

// Blogs
const LazyBlogs = lazy(() => import("./components/blogs/Blog"));
const LazyIndividualBlog = lazy(() =>
  import("./components/blogs/IndividualBlog")
);
const LazyAddBlog = lazy(() => import("./components/blogs/AddBlog"));

// Events
const LazyEventList = lazy(() => import("./components/events/EventList"));
const LazyAddEvent = lazy(() => import("./components/events/AddEvent"));
const LazyIndividualEvent = lazy(() => import("./components/events/EventPage"));

const theme = responsiveFontSizes(createMuiTheme());
const Lazy404 = lazy(() => import("./components/404/NotFound"));

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
          <ScrollToTop />
          <ThemeProvider theme={theme}>
            <Box
              flexGrow={1}
              style={{ marginBottom: "auto", minHeight: "80vh" }}
            >
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path="/" component={LazyHome} />
                  <Route path="/about" component={LazyAbout} />
                  <Route exact path="/blogs" render={() => <LazyBlogs />} />
                  <Route path="/signin" component={LazySignin} />
                  <Route path="/reset" component={LazyResetPw} />
                  <Route path="/newpass/:token" component={LazyNewPw} />
                  <ProtectedRoute
                    exact
                    path="/addblog"
                    component={LazyAddBlog}
                  />
                  <Route path="/blogs/:id" component={LazyIndividualBlog} />
                  <Route
                    path="/blogs?tag=:tag"
                    render={() => <LazyBlogs key={window.location} />}
                  />
                  <ProtectedRoute
                    path="/blog/edit/:id"
                    component={LazyAddBlog}
                  />
                  <Route path="/signup" component={LazySignup} />
                  <Route
                    exact
                    path="/events/:id"
                    component={LazyIndividualEvent}
                  />
                  <Route path="/events" component={LazyEventList} />
                  <ProtectedRoute path="/addevent" component={LazyAddEvent} />
                  <ProtectedRoute
                    path="/event/edit/:id"
                    component={LazyAddEvent}
                  />
                  <Route
                    path="/events/register"
                    component={LazyRegisterEvent}
                  />
                  <Route path="/resources" component={LazyResourcePage} />
                  <Route path="/projects/:id" component={LazyProjectList} />
                  <Route path="/projects" component={LazyProjects} />
                  <Route path="/alumni" component={LazyAlumniPage} />
                  <Route component={Lazy404} />
                </Switch>
              </Suspense>
            </Box>
          </ThemeProvider>
          <Box>
            <Footer />
          </Box>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
