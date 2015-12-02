/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */
var React = require('react');

var ContentWrapper = require('./ContentWrapper');
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
    states: ApiStore.getStates(),
    orgTypes: ApiStore.getOrgTypes(),
    cities: ApiStore.getCities(),
    counties: ApiStore.getCounties(),
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
    var griddle;
    if (this.state.dataGridState.length) {
      griddle = <DataGrid results={this.state.dataGridState} />
    }

    return (
        <ContentWrapper headerTitle="Search" content={
          <div>
            <SearchBox
              states={this.state.states}
              orgTypes={this.state.orgTypes}
              cities={this.state.cities}
              counties={this.state.counties}
            />
            {griddle}
          </div>
        }/>
    );
  },

  /**
   * Event handler for 'change' events coming from the ApiStore
   */
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = EmergencyApp;
