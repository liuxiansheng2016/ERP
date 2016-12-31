var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var browserHistory = require('react-router').browserHistory;
var Login = require('./login');
var Change = require('./changePassword');


ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="login" component={Login}/>
    <Route path="changePassword" component={Change}/>
  </Router>),
  document.getElementById('main')
)
