'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Griddle = require('griddle-react');

var Treatment = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchTreatment({orgId: this.props.orgId});
  },

  render: function() {
    var griddle = '';
    var treatment = this.props.myData.treatment;

    if (treatment && treatment.length) {
      griddle = (
        <Griddle
          columns={['type', 'abbreviation']}
          columnMetadata={[
              {order: 1, columnName: 'type', displayName: 'Name'},
              {order: 2, columnName: 'abbreviation', displayName: 'Abbreviation'},
            ]}
          useGriddleStyles={false}
          tableClassName="table"
          showPager={false}
          resultsPerPage={100}
          results={treatment}/>
      );
    }
    return (
      <div>
        {griddle}
      </div>
    );
  }
});


module.exports = Treatment;
