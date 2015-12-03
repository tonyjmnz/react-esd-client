var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route

var SearchController = require('./SearchController');
var DetailsController = require('./DetailsController');

var PropTypes = React.PropTypes;

var Root = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Router history={this.props.history}>
        <Route name='home' path='/' component={SearchController}/>
        <Route name='details' path='/details/:orgId' component={DetailsController} />
      </Router>
    );
  }
});

module.exports = Root;
