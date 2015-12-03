'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');

var Locations = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchLocations({orgId: this.props.orgId});
  },

  render: function() {
    return (
      <div>{JSON.stringify(this.props.myData)}</div>
    );
  }

});


module.exports = Locations;
