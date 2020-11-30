import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import FooterPage from "./views/Footer/FooterPage";
import AnalyticsAdmin from "./views/BlogPage/AnalyticsAdmin";
import Test from "./views/BlogPage/Test";
import IdeasPage from "./views/BlogPage/IdeasPage";
import ProfilePage from "./views/BlogPage/ProfilePage";
import NewIdeaPage from "./views/BlogPage/Section.js/NewIdeaPage";
import AdminPage from "./views/BlogPage/AdminPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        {/* <NavBar /> */}
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/analytics"
              component={Auth(AnalyticsAdmin, true)}
            />
            <Route exact path="/ideas" component={Auth(IdeasPage, null)} />
            <Route exact path="/profile" component={Auth(ProfilePage, null)} />
            <Route exact path="/newIdea" component={Auth(NewIdeaPage, null)} />
            <Route exact path="/admin" component={Auth(AdminPage, null)} />
            <Route exact path="/test" component={Auth(Test, null)} />
          </Switch>
        </div>
      </Router>
      <FooterPage />
    </Suspense>
  );
}

export default App;
