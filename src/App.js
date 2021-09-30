import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import ProjectDetails from "./modules/ProjectDetails/ProjectDetails";
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
        <Route exact path="/projects/:id" component={ProjectDetails} />
      </Switch>
    </Router>
  );
}

export default App;
