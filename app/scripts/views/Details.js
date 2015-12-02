var React = require('react');
var ContentWrapper = require('./ContentWrapper');

var Details = React.createClass({
  componentDidMount: function() {
    alert('call dat ajax');
  },
  render: function() {
    return (
      <ContentWrapper headerTitle="Details" content={
        <div>these are the details for {this.props.params.orgId}</div>
      }/>
    );
  }
});

module.exports = Details;
