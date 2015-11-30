/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */
var React = require('react');

var SearchBox = require('./SearchBox');
var DataGrid = require('./DataGrid');
var ApiStore = require('../stores/ApiStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
  return {
    //searchBoxState: TodoStore.getAll(),
    dataGridState: ApiStore.getData(),
  };
}

var EmergencyApp = React.createClass({
  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    ApiStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ApiStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <SearchBox />
        <DataGrid dataProp={this.state.dataGridState} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = EmergencyApp;
