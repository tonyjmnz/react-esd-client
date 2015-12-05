'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var utils = require('./view-utils');

var General = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchGeneral({orgId: this.props.orgId});
  },

  render: function() {
    var d = this.props.myData;

    return (
      <div>
        <dl className="dl-horizontal">
          {utils.getListItem('Name', d.name)}
          {utils.getListItem('Email', d.email, 'email')}
          {utils.getListItem('Website', d.website, 'link')}
          {utils.getListItem('Description', d.description)}
          {utils.getListItem('Members', d.nummembers)}
          {utils.getListItem('Calls', d.numcalls)}
          {utils.getListItem('Service Area', d.serviceArea)}
        </dl>
      </div>
    );
  }

});


module.exports = General;
