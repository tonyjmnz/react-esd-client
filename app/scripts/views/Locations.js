'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Select = require('react-select');

var ScriptjsLoader = require('react-google-maps/lib/async/ScriptjsLoader');
var GoogleMap = require('react-google-maps').GoogleMap;
var Marker = require('react-google-maps').Marker;

var utils = require('./view-utils');

var Locations = React.createClass({

  proptypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchLocations({orgId: this.props.orgId});
  },

  getInitialState: function() {
    return {
      currentLocation: '',
      locationData: undefined
    };
  },

  onSelectChange: function(value) {
    this.setState({currentLocation: value});
    var locationData = this.props.myData.location[value - 1];
    //wrap in array in case we get only one record
    if (!locationData) {
      this.setState({locationData: undefined})
      return;
    }

    locationData.latitude = parseFloat(locationData.latitude);
    locationData.longitude = parseFloat(locationData.longitude);
    this.setState({locationData: locationData})

  },

  getOptions: function(data) {
    if (!data || !data.location) return [];

    var opts = data.location.map(function(location, i) {
      return {value: i + 1, label: 'Location: ' + location.type};
    });

    return opts;
  },

  render: function() {
    var self = this;

    var googleMap = '';
    var infoList = '';

    if (this.state.locationData) {
      var d = self.state.locationData;

      var pos = {
        lat: d.latitude,
        lng: d.longitude
      };

      //query={{v: '3.14', libraries: "geometry,drawing,places"}}
      if (!isNaN(pos.lat) && !isNaN(pos.lng)) {
        googleMap = (
          <ScriptjsLoader
            hostname={"maps.googleapis.com"}
            pathname={"/maps/api/js"}
            query={{v: '3.14'}}
            loadingElement={
              <div>
              </div>
            }
            containerElement={
              <div style={{height:'300px'}}/>
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={15}
                center={pos}
              >
                <Marker position={pos}/>
              </GoogleMap>
            }
          />
        );
      }

      infoList = (
        <dl className="dl-horizontal">
          {utils.getListItem('Type', d.type)}
          {utils.getListItem('Address', d.address1)}
          {utils.getListItem('City', d.city)}
          {utils.getListItem('State', d.state)}
          {utils.getListItem('County', d.countyName)}
          {utils.getListItem('Zip Code', d.zip)}
          {utils.getListItem('Phone', d.phone)}
          {utils.getListItem('TTY Phone', d.ttyphone)}
          {utils.getListItem('Latitude', d.latitude)}
          {utils.getListItem('Longitude', d.longitude)}
        </dl>);
    }

    return (

      <div className="row">
        <div className="col-md-6">
                <Select
                  onChange={this.onSelectChange}
                  value={this.state.currentLocation}
                  placeholder="Please select a location"
                  options={this.getOptions(this.props.myData)} />
          {infoList}
        </div>
        <div className="col-md-6">
          {googleMap}
        </div>
        {/*JSON.stringify(this.props.myData)*/}
      </div>
    );
  }

});


module.exports = Locations;
