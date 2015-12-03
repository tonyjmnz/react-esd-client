'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Select = require('react-select');
var Griddle = require('griddle-react');

var People = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      currentSite: '',
      personData: []
    };
  },

  componentDidMount: function() {
    ApiActions.fetchPeople({orgId: this.props.orgId});
  },

  onSelectChange: function(value) {
    this.setState({currentSite: value});
    var personData = this.props.myData.site[value - 1].person;
    //wrap in array in case we get only one record
    if (!personData) {
      this.setState({personData: []})
      return;
    }

    personData = Array.isArray(personData) ? personData : [personData];
    this.setState({personData: personData})

  },

  getOptions: function(data) {
    if (!data || !data.site) return [];

    var opts = data.site.map(function(site, i) {
      return {value: i + 1, label: site.$.address};
    });

    return opts;
  },

  render: function() {
    var griddle = '';
    if (this.state.personData.length) {
      griddle = (
        <Griddle
          columns={['name', 'role']}
          columnMetadata={[
              {order: 1, columnName: 'name', displayName: 'Name'},
              {order: 2, columnName: 'role', displayName: 'Role'},
            ]}
          useGriddleStyles={false}
          tableClassName="table"
          showPager={false}
          resultsPerPage={100}
          results={this.state.personData}/>
      );
    }

    return (
      <div>
        <Select
          onChange={this.onSelectChange}
          value={this.state.currentSite}
          placeholder="Please select a site"
          options={this.getOptions(this.props.myData)} />
          {griddle}
      </div>
    );
  }

});


module.exports = People;
