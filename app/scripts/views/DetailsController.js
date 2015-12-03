/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the ApiStore and passes the new data to its children.
 */
var React = require('react');

var ContentWrapper = require('./ContentWrapper');
var ApiStore = require('../stores/ApiStore');

var Tabs = require('./Tabs');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
  return {
    //searchBoxState: TodoStore.getAll(),
    tabs: ApiStore.getTabs(),
    generalData: ApiStore.getGeneral(),
    locationData: ApiStore.getLocations(),
    peopleData: ApiStore.getPeople(),
    treatmentData: ApiStore.getTreatment(),
    trainingData: ApiStore.getTraining(),
    facilitiesData: ApiStore.getFacilities(),
    equipmentData: ApiStore.getEquipment(),
    physiciansData: ApiStore.getPhysicians(),
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

  render: function() {
    return (
      <ContentWrapper headerTitle="Details" content={
        <Tabs
          orgId={this.props.params.orgId}
          tabs={this.state.tabs}
          generalData={this.state.generalData}
          locationsData={this.state.locationData}
          peopleData={this.state.peopleData}
          treatmentData={this.state.treatmentData}
          trainingData={this.state.trainingData}
          facilitiesData={this.state.facilitiesData}
          equipmentData={this.state.equipmentData}
          physiciansData={this.state.physiciansData}
          />
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
