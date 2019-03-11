import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "../Main/Main";
import View from "../View/View";

class App extends Component {
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/View/:id" component={View}/>
          </Switch>
        </Router>
    );
  }
}

export default App;