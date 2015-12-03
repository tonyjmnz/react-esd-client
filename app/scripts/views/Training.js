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
    if (this.props.myData.training) {
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
          results={this.props.myData.training}/>
      );
    }
    return (
      <div>
        {griddle}
      </div>
    );
  }

});


module.exports = Training;
