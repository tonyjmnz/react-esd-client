'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h3 className="text-muted">{this.props.title}</h3>
      </div>
    );
  }
});

module.exports = Header;
