'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Griddle = require('griddle-react');

var Physicians = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchPhysicians({orgId: this.props.orgId});
  },

  render: function() {
    var griddle = '';
    var physician = this.props.myData.physician;
    var noResults = (
      <h3 className="vcenter">No equipments found for this organization.</h3>
    );

    if (physician && physician.length) {
      griddle = (
        <Griddle
          columns={['name', 'license', 'phone']}
          columnMetadata={[
              {order: 1, columnName: 'name', displayName: 'Name'},
              {order: 2, columnName: 'license', displayName: 'License'},
              {order: 2, columnName: 'phone', displayName: 'Contact'},
            ]}
          useGriddleStyles={false}
          tableClassName="table"
          showPager={false}
          resultsPerPage={100}
          results={physician}/>
      );
    }
    return (
      <div>
        {griddle}
      </div>
    );
  }

});


module.exports = Physicians;
