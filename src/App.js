import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import ProjectDetails from "./modules/ProjectDetails/ProjectDetails";
import Projects from "./modules/Projects/Projects";
import Contact from "./modules/Contact/Contact";
import MenuButton from "./components/MenuButton/MenuButton";
import Services from "./modules/Services/Services";

function App() {
  return (
    <Router>
      <MenuButton />
      <Switch>
        <Route exact path="/" component={Services} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
      </Switch>
    </Router>
  );
}

export default App;
