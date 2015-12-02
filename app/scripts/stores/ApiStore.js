var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var APIData = {
  orgTypes: [],
  states: [],
  cities: [],
  counties: [],
  searchResults: [],
};

var formatStates = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.State, label:obj.State};
  });
  return opts;
};

var formatOrgTypes = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.type, label:obj.type};
  });
  return opts;
};

var formatCities = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.city, label:obj.city};
  });
  return opts;
};

var formatCounties = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.CountyName, label:obj.CountyName};
  });

  //workaround, removing duplicates from county list...
  var uniqueBuff = [];
  var uniqueArr = [];
  opts.forEach(function(el) {
    if (uniqueBuff.indexOf(el.value.toLowerCase()) === -1) {
      uniqueBuff.push(el.value.toLowerCase());
      uniqueArr.push(el);
    }
  });

  return uniqueArr;
};


var ApiStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return APIData.searchResults;
  },

  getStates: function() {
    return APIData.states;
  },

  getOrgTypes: function() {
    return APIData.orgTypes;
  },

  getCities: function() {
    return APIData.cities;
  },

  getCounties: function() {
    return APIData.counties;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case AppConstants.NEW_DATA:
      APIData.searchResults = action.data.map(function(obj) {
        delete obj.$;
        return obj;
      });
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_STATES:
      APIData.states = formatStates(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_ORGS:
      APIData.orgTypes = formatOrgTypes(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_CITIES:
      APIData.cities = formatCities(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_COUNTIES:
      APIData.counties = formatCounties(action.data);
      ApiStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ApiStore;
