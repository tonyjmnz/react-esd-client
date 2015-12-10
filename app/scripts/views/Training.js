'use strict'

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var Griddle = require('griddle-react');

var Training = React.createClass({

  propTypes: {
    orgId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    ApiActions.fetchTraining({orgId: this.props.orgId});
  },

  render: function() {
    var griddle = '';
    var training = this.props.myData.training;

    var noResults = (
      <h3 className="vcenter">No trainings found in this organization.</h3>
    );

    if (training && training.length) {
      griddle = (
        <Griddle
          columns={['type', 'abbreviation']}
          columnMetadata={[
              {order: 1, columnName: 'type', displayName: 'Type'},
              {order: 2, columnName: 'abbreviation', displayName: 'Abbreviation'},
            ]}
          useGriddleStyles={false}
          tableClassName="table"
          showPager={false}
          resultsPerPage={100}
          results={training}/>
      );
    }
    return (
      <div>
        {griddle || noResults}
      </div>
    );
  }

});


module.exports = Training;
