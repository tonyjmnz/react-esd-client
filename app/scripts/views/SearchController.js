/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the ApiStore and passes the new data to its children.
 */
var React = require('react');

var ContentWrapper = require('./ContentWrapper');
var SearchBox = require('./SearchBox');
var SearchGrid = require('./SearchGrid');
var ApiStore = require('../stores/ApiStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
  return {
    //searchBoxState: TodoStore.getAll(),
    searchGridState: ApiStore.getData(),
    states: ApiStore.getStates(),
    orgTypes: ApiStore.getOrgTypes(),
    cities: ApiStore.getCities(),
    counties: ApiStore.getCounties(),
  };
}

var SearchController = React.createClass({
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
    if (this.state.searchGridState.length) {
      griddle = <SearchGrid results={this.state.searchGridState} />
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

module.exports = SearchController;
