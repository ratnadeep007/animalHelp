import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/" component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
