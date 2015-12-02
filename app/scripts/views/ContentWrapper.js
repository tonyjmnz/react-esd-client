'use strict';

var React = require('react');
var Header = require('./Header');
var Link = require('react-router').Link;

var ContentWrapper = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Emergency Services Directory</Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <Header title={this.props.headerTitle}/>
          {this.props.content}
          <div className="footer">
              <p>♥ from the Yeoman team</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ContentWrapper;
