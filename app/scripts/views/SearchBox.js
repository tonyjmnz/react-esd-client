'use strict';

var React = require('react');

var Select = require('react-select');

var ApiActions = require('../actions/ApiActions');

var SearchBox = React.createClass({
  getInitialState: function() {
    return {
      orgType: '',
      orgName: '',
      state: '',
      city: '',
      county: '',
      zipCode: ''
    };
  },

  componentDidMount: function() {
    ApiActions.fetchStates();
    ApiActions.fetchOrgTypes();
  },

  onOrgTypeChange: function(value) {
    this.setState({orgType: value});
  },

  onOrgNameChange: function(e) {
    this.setState({orgName: e.target.value});
  },

  onStateChange: function(value) {
    this.setState({state: value});
    //ApiActions.fetchCities(this.getAPIParams());
    ApiActions.fetchCounties({
      state: value
    });

    ApiActions.fetchCities({
      state: value
    });

    this.state.city = '';
    this.state.county = '';
  },

  onCityChange: function(value) {
    this.setState({city: value});
  },

  onCountyChange: function(value) {
    this.setState({county: value});
    ApiActions.fetchCities({
      state: this.state.state,
      county: value,
    });

    //should we clear the city when the county changes?
    this.state.city = '';
  },

  onZipCodeChange: function(e) {
    this.setState({zipCode: e.target.value});
  },

  getAPIParams: function() {
    return {
      type: this.state.orgType,
      name: this.state.orgName,
      town: this.state.city,
      state: this.state.state,
      zip: this.state.zipCode,
      county: this.state.county
    };
  },

  _onSubmit: function(e) {
    e.preventDefault();
    ApiActions.search(this.getAPIParams());
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form className="form" onSubmit={this._onSubmit}>
            <div className="row">
              <div className="col-md-4">
                <SearchField id="org-name" name="Organization Name" value={this.state.orgName} onChange={this.onOrgNameChange} />
              </div>
              <div className="col-md-4">
                <SelectSearchField id="org-type" name="Organization Type" value={this.state.orgType} onChange={this.onOrgTypeChange} options={this.props.orgTypes}/>
              </div>
              <div className="col-md-4">
                <SelectSearchField id="state" name="State" value={this.state.state} onChange={this.onStateChange} options={this.props.states}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <SelectSearchField id="city" name="City" value={this.state.city} onChange={this.onCityChange} options={this.props.cities}/>
              </div>
              <div className="col-md-4">
                <SelectSearchField id="county" name="County" value={this.state.county} onChange={this.onCountyChange} options={this.props.counties}/>
              </div>
              <div className="col-md-4">
                <SearchField id="zip-code" name="Zip Code" value={this.state.zipCode} onChange={this.onZipCodeChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right">
                <button className="btn btn-default">{'Search'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

/*
  props.id = input id and label for attribute
  props.name = label text
  props.value = state property
  props.onChange = onChange event handler
*/

var SearchField = React.createClass({
  onChange: function(e) {
    this.props.onChange(e);
  },

  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <input className="form-control" id={this.props.id} onChange={this.onChange} value={this.props.value} />
      </div>
    );
  }
});

/*
  props.id = input id and label for attribute
  props.name = label text
  props.value = state property
  props.onChange = onChange event handler
*/

var SelectSearchField = React.createClass({
  onChange: function(value) {
    this.props.onChange(value);
  },

  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <Select onChange={this.onChange} value={this.props.value} options={this.props.options} />
      </div>
    );
  }
});

module.exports = SearchBox;
