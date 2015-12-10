/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var Griddle = require('griddle-react');
var ReactPropTypes = React.PropTypes;

var Link = require('react-router').Link;

//creates a link column for the grid
var LinkColumn = React.createClass({
  render: function(){
    var url ="/details/" + this.props.rowData.OrganizationID;
    return <Link to={url}>{this.props.data}</Link>
  }
});

//creates the grid for the search results
var SearchGrid = React.createClass({
  propTypes: {
    results: ReactPropTypes.array.isRequired
  },
  render: function() {
    return (
      <div>
        <Griddle
          columns={['type', 'Name', 'city', 'zip', 'CountyName', 'State']}
          columnMetadata={[
              {order: 1, columnName: 'Name', displayName: 'Organization Name', customComponent: LinkColumn},
              {order: 2, columnName: 'type', displayName: 'Org. Type'},
              {order: 3, columnName: 'State'},
              {order: 4, columnName: 'city', displayName: 'City'},
              {order: 5, columnName: 'CountyName', displayName: 'County'},
              {order: 6, columnName: 'zip', displayName: 'Zip'},
            ]}
          useGriddleStyles={false}
          resultsPerPage={10}
          tableClassName="table"
          results={this.props.results}/>
      </div>
    );
  }

});



module.exports = SearchGrid;
