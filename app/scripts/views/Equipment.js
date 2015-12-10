'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Griddle = require('griddle-react');

var Equipment = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchEquipment({orgId: this.props.orgId});
  },

  render: function() {
    var griddle = '';
    var equipment = this.props.myData.equipment;

    var noResults = (
      <h3 className="vcenter">No equipments found for this organization.</h3>
    );


    if (equipment && equipment.length) {
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
          results={equipment}/>
      );
    }
    return (
      <div>
        {griddle || noResults}
      </div>
    );
  }

});


module.exports = Equipment;
