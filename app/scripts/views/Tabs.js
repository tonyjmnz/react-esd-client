'use strict';

var React = require('react');

var ApiActions = require('../actions/ApiActions');
var General = require('./General');
var Locations = require('./Locations');
var People = require('./People');
var Treatment = require('./Treatment');
var Training = require('./Training');
var Facilities = require('./Facilities');
var Equipment = require('./Equipment');
var Physicians = require('./Physicians');

var Tabs = React.createClass({

  getInitialState: function() {
    return {
      orgId: '',
      tabs: [],
    };
  },

  componentDidMount: function() {
    ApiActions.fetchTabs({orgId: this.props.orgId, mode: 'View'});
  },

  generateTabs: function(tabs) {
    var tabsJSX = tabs.map(function(tabTitle, index) {
      var id = tabTitle.toLowerCase();
      var className = id === 'general' ? 'active' : '' ;

      return (
        <li role="presentation" className={className} key={index}>
          <a href={'#' + id} role="tab" data-toggle="tab">{tabTitle}</a>
        </li>
      );
    });
    return <ul className="nav nav-tabs nav-justified" role="tablist">{tabsJSX}</ul>
  },

  getContentComponent: function(component) {

    var components = {
      general: General,
      locations: Locations,
      people: People,
      treatment: Treatment,
      training: Training,
      facilities: Facilities,
      equipment: Equipment,
      physicians: Physicians,
    };

    return components[component];
  },

  generateTabsContent: function(tabs) {
    var self = this;

    var tabsContentJSX = tabs.map(function(tabTitle, index) {
      var id = tabTitle.toLowerCase();
      var component = self.getContentComponent(id);
      var classNames = 'tab-pane fade';

      if (id === 'general') {
        classNames += ' in active';
      }

      var contentComponentData = self.props[id + 'Data'];

      return (
        <div role="tabpanel" className={classNames} id={id} key={index}>
          {React.createElement(component, {orgId: self.props.orgId, myData: contentComponentData})}
        </div>
      );
    });
    return <div className="tab-content">{tabsContentJSX}</div>
  },

  render: function() {
    if (this.props.tabs) {
      var tabs = this.generateTabs(this.props.tabs);
      var tabsContent = this.generateTabsContent(this.props.tabs);
    }

    return (
      <div>
        {tabs}
        {tabsContent}
      </div>

    );
  }


});

module.exports = Tabs;
