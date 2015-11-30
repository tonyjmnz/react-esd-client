'use strict';

var React = require('react'),
    API = require('../api-interface'),
    Select = require('react-select');

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
  getOrgTypes: function(input, callback) {
    var toSelectObject = function(jsonResponse) {
      var opts = jsonResponse.map(function(obj) {
        return {value:obj.type, label:obj.type};
      });

      var selectData = {
        options: opts,
        complete: true
      };
      callback(null, selectData);
    };

    API.getOrgTypes(toSelectObject);
  },
  getStates: function(input, callback) {
    var toSelectObject = function(jsonResponse) {
      var opts = jsonResponse.map(function(obj) {
        return {value:obj.State, label:obj.State};
      });

      var selectData = {
        options: opts,
        complete: true
      };
      callback(null, selectData);
    };

    API.getStates(toSelectObject);
  },
  getCities: function(input, callback) {
    var toSelectObject = function(jsonResponse) {
      var opts = jsonResponse.map(function(obj) {
        return {value:obj.city, label:obj.city};
      });

      var selectData = {
        options: opts,
        complete: true //may have to set it to false to fetch each time
      };
      callback(null, selectData);
    };

    var params = {
      state: this.state.state,
      count: this.state.county
    };
    API.getCities(params, toSelectObject);
  },
  getCounties: function(input, callback) {
    var toSelectObject = function(jsonResponse) {
      var opts = jsonResponse.map(function(obj) {
        return {value:obj.CountyName, label:obj.CountyName};
      });

      //workaround, removing duplicates from county list...
      var uniqueBuff = [];
      var uniqueArr = [];
      opts.forEach(function(el) {
        if (uniqueBuff.indexOf(el.value.toLowerCase()) === -1) {
          uniqueBuff.push(el.value.toLowerCase());
          uniqueArr.push(el);
        }
      });

      var selectData = {
        options: uniqueArr,
        complete: true //may have to set it to false to fetch each time
      };
      callback(null, selectData);
    };

    var params = {
      state: this.state.state,
    };
    API.getCounties(params, toSelectObject);
  },
  onOrgTypeChange: function(value) {
    this.setState({orgType: value});
  },
  onOrgNameChange: function(e) {
    this.setState({orgName: e.target.value});
  },
  onStateChange: function(value) {
    this.setState({state: value});
    //this.setState({state: value, city: ''});
  },
  onCityChange: function(value) {
    this.setState({city: value});
  },
  onCountyChange: function(value) {
    this.setState({county: value});
  },
  onZipCodeChange: function(e) {
    this.setState({zipCode: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.state);
    var params = {
      type: this.state.orgType,
      name: this.state.orgName,
      town: this.state.city,
      state: this.state.state,
      zip: this.state.zipCode,
      county: this.state.county
    };

    API.getOrganizations(params, this.getSearchResults);

  },
  getSearchResults: function(results) {
    console.log(results ? results.length : 0);
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Search</h3>
        </div>
        <div className="panel-body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <SelectSearchField id="org-type" name="Organization Type" value={this.state.orgType} onChange={this.onOrgTypeChange} dataFetcher={this.getOrgTypes}/>
              </div>
              <div className="col-md-4">
                <SearchField id="org-name" name="Organization Name" value={this.state.orgName} onChange={this.onOrgNameChange} />
              </div>
              <div className="col-md-4">
                <SelectSearchField id="state" name="State" value={this.state.state} onChange={this.onStateChange} dataFetcher={this.getStates}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <SelectSearchField id="city" name="City" value={this.state.city} onChange={this.onCityChange} dataFetcher={this.getCities}/>
              </div>
              <div className="col-md-4">
                <SelectSearchField id="county" name="County" value={this.state.county} onChange={this.onCountyChange} dataFetcher={this.getCounties}/>
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
        <Select onChange={this.onChange} value={this.props.value} asyncOptions={this.props.dataFetcher} />
      </div>
    );
  }
});

module.exports = SearchBox;
