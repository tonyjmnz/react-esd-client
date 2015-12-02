var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route

var EmergencyApp = require('./EmergencyApp');
var Details = require('./Details');

var PropTypes = React.PropTypes;


var Root = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired
  },
  render: function() {
    return (
      <Router history={this.props.history}>
        <Route name='home' path='/' component={EmergencyApp}/>
        <Route name='details' path='/details/:orgId' component={Details} />
      </Router>
    );
  }
});

module.exports = Root;
