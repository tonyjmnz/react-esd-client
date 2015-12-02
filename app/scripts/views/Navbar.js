'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({
  render: function() {
    console.log(this.props);
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

        </div>
        <div className="footer">
            <p>♥ from the Yeoman team</p>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
