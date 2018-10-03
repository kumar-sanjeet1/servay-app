import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Landing from './landing'
import Dashboard from './dashboard';
import Header from './header';
import * as actions from '../actions';


class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
      return (
    <div>
            <Router>
              <div>
                     <Header />
                       <Route exact path="/" component={Landing} />
                       <Route path="/dashboard" component={Dashboard} />
              </div>
                   
            </Router>
    </div>
      )
    }
}
export default connect(null, actions)(App)