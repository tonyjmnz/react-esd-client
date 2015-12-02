var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ESD_API = require('../esd-api');

var AppActions = {

  /**
   * @param  {string} text
   */
  search: function(params) {
    ESD_API.getOrganizations(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_DATA,
        data: data
      });
    });
  },
  fetchStates: function() {
    ESD_API.getStates(function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_STATES,
        data: data
      });
    });
  },
  fetchOrgTypes: function() {
    ESD_API.getOrgTypes(function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_ORGS,
        data: data
      });
    });
  },
  fetchCities: function(params) {
    ESD_API.getCities(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_CITIES,
        data: data
      });
    });
  },
  fetchCounties: function(params) {
    ESD_API.getCounties(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_COUNTIES,
        data: data
      });
    });
  },
};

module.exports = AppActions;
