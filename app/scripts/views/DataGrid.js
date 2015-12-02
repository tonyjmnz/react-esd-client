/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var Griddle = require('griddle-react');
var ReactPropTypes = React.PropTypes;

var Link = require('react-router').Link;

var LinkColumn = React.createClass({
  render: function(){
    var url ="/details/" + this.props.rowData.OrganizationID;
    return <Link to={url}>{this.props.data}</Link>
  }
});

var DataGrid = React.createClass({
  propTypes: {
    results: ReactPropTypes.array.isRequired
  },
  /**
   * @return {object}
   */
  render: function() {
    //useGriddleStyles={false} tableClassName="table"
    //results={[{"OrganizationID":"1022","type":"Fire Department","Name":"Arch St. Volunteer Fire Department","Email":"asfd105@yahoo.com","city":"Little Rock","zip":"72206","CountyName":"Pulaski","State":"AR"}]}/>

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
          tableClassName="table"
          results={this.props.results}/>
      </div>
    );
  }

});



module.exports = DataGrid;
