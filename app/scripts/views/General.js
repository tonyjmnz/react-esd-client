'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');

var General = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchGeneral({orgId: this.props.orgId});
  },

  getListItem: function(label, property, type) {
    if (!property || property === 'null') return '';

    var dd = property;

    if (type === 'email') {
      dd = (<a href={'mailto:'+dd}>{dd}</a>);
    } else if (type === 'link') {
      dd = (<a href={dd}>{dd}</a>);
    }

    return (<div><dt>{label}</dt><dd>{dd}</dd></div>);
  },

  render: function() {
    var d = this.props.myData;

    return (
      <div>
        <dl className="dl-horizontal">
          {this.getListItem('Name', d.name)}
          {this.getListItem('Email', d.email, 'email')}
          {this.getListItem('Website', d.website, 'link')}
          {this.getListItem('Description', d.description)}
          {this.getListItem('Members', d.nummembers)}
          {this.getListItem('Calls', d.numcalls)}
          {this.getListItem('Service Area', d.serviceArea)}
        </dl>
      </div>
    );
  }

});


module.exports = General;
