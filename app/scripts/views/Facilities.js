'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Griddle = require('griddle-react');

var Facilities = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchFacilities({orgId: this.props.orgId});
  },

  render: function() {
    var griddle = '';
    var facility = this.props.myData.facility;
    var noResults = (
      <h3 className="vcenter">No facilities found for this organization.</h3>
    );

    if (facility && facility.length) {
      griddle = (
        <Griddle
          columns={['type', 'quantity', 'description']}
          columnMetadata={[
              {order: 1, columnName: 'type', displayName: 'Name'},
              {order: 2, columnName: 'quantity', displayName: 'Quantity'},
              {order: 2, columnName: 'description', displayName: 'Description'},
            ]}
          useGriddleStyles={false}
          tableClassName="table"
          showPager={false}
          resultsPerPage={100}
          results={facility}/>
      );
    }
    return (
      <div>
        {griddle || noResults}
      </div>
    );
  }

});


module.exports = Facilities;
