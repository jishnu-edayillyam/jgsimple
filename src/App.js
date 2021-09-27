import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ProjectDetails from "./modules/ProjectDetails/ProjectDetails";
import Slideshow from "./modules/Slideshow/Slideshow";
import Projects from "./modules/Projects/Projects";
import Contact from "./modules/Contact/Contact";
import MenuButton from "./components/MenuButton/MenuButton";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <Router>
      <MenuButton />
      <Switch>
        <Route exact path="/" component={Projects} />
        <Route exact path="/Loader" component={Loader} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/ProjectDetails" component={ProjectDetails} />
        <Route exact path="/slideshow" component={Slideshow} />
        {/* <PrivateRoute exact path="/problems/:id" component={ProblemPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
