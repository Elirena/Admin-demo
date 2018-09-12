import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import AuthPage from "../AuthPage/AuthPage";
import UsersPage from "../UsersPage/UsersPage";
import UsersId from "../UserId/UserId";
import TopBlock from "../TopBlock/TopBlock";

import './App.css';

/**
 * MainPage
 */

class App extends Component {

  render() {
    return (
      <div className="App">
          <TopBlock/>
          <Router>
              <React.Fragment>
                  <Route exact path="/" component={AuthPage} />
                  <Route exact path="/auth" component={AuthPage}/>
                  <Route exact path="/users" component={UsersPage}/>
                  <Route exact path="/users/:id" component={UsersId}/>
              </React.Fragment>
          </Router>
      </div>
    );
  }
}

export default App;
