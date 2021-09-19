import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ProjectDetails from "./modules/ProjectDetails/ProjectDetails";
import Slideshow from "./modules/Slideshow/Slideshow";
import AllProjects from "./modules/AllProjects/AllProjects";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProjects} />
        <Route exact path="/ProjectDetails" component={ProjectDetails} />
        <Route exact path="/slideshow" component={Slideshow} />
        {/* <PrivateRoute exact path="/problems/:id" component={ProblemPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
