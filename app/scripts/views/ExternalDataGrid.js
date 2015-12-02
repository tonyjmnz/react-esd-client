var Griddle = require('griddle-react');

var ExternalComponent = React.createClass({
    getInitialState: function(){
      var initial = { "results": [],
          "currentPage": 0,
          "maxPages": 0,
          "externalResultsPerPage": 10,
          "externalSortColumn":null,
          "externalSortAscending":true,
          "results": []
      };

      return initial;
    },
    //general lifecycle methods
    componentWillMount: function(){
    },
    componentDidMount: function(){
      this.getExternalData();
    },
    //what page is currently viewed
    setPage: function(index){
      //This should interact with the data source to get the page at the given index
      index = index > this.state.maxPages ? this.state.maxPages : index < 1 ? 1 : index + 1;
      this.getExternalData(index);
    },
    //this will handle how the data is sorted
    sortData: function(sort, sortAscending, data){
    },
    //this changes whether data is sorted in ascending or descending order
    changeSort: function(sort, sortAscending){
    },
    //this method handles the filtering of the data
    setFilter: function(filter){
    },
    //this method handles determining the page size
    setPageSize: function(size){
    },
    getExternalData: function(page){

      page = page||1
      this.setState({
        results: this.props.results,
        currentPage: page-1,
        maxPages: Math.round(this.props.results.length/10)
      })
    },
    render: function(){
      return <div><Griddle
        useExternal={true}
        externalSetPage={this.setPage}
        enableSort={false}
        //columns={["name", "model", "manufacturer", "passengers"]}
        externalSetPageSize={this.setPageSize}
        externalMaxPage={this.state.maxPages}
        externalChangeSort={function(){}}
        externalSetFilter={function(){}}
        externalCurrentPage={this.state.currentPage}
        results={this.props.results}
        tableClassName="table"
        resultsPerPage={this.state.externalResultsPerPage}
        externalSortColumn={this.state.externalSortColumn}
        externalSortAscending={this.state.externalSortAscending} />
        {JSON.stringify(this.state.results)}
        {JSON.stringify(this.props.results)}</div>
    }
});

module.exports = ExternalComponent;
