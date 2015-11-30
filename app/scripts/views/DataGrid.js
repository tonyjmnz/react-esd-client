/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var TodoStore = require('../stores/ApiStore');
var ReactPropTypes = React.PropTypes;

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
}

var DataGrid = React.createClass({
  propTypes: {
    dataProp: ReactPropTypes.array.isRequired
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        {JSON.stringify(this.props.dataProp)}
      </div>
    );
  }

});

module.exports = DataGrid;
