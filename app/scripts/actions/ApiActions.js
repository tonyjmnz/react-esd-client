var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ESD_API = require('../esd-api');

var ApiActions = {

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

  fetchTabs: function(params) {
    ESD_API.getTabs(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_TABS,
        data:data
      });
    });
  },

  fetchGeneral: function(params) {
    ESD_API.getGeneralInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_GENERAL,
        data:data
      });
    });
  },

  fetchLocations: function(params) {
    ESD_API.getLocationsInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_LOCATIONS,
        data:data
      });
    });
  },

  fetchPeople: function(params) {
    ESD_API.getPeopleInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_PEOPLE,
        data:data
      });
    });
  },

  fetchTreatment: function(params) {
    ESD_API.getTreatmentInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_TREATMENT,
        data:data
      });
    });
  },

  fetchTraining: function(params) {
    ESD_API.getTrainingInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_TRAINING,
        data:data
      });
    });
  },

  fetchFacilities: function(params) {
    ESD_API.getFacilitiesInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_FACILITIES,
        data:data
      });
    });
  },

  fetchEquipment: function(params) {
    ESD_API.getEquipmentInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_EQUIPMENT,
        data:data
      });
    });
  },

  fetchPhysicians: function(params) {
    ESD_API.getPhysiciansInfo(params, function(data) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NEW_PHYSICIANS,
        data:data
      });
    });
  },

};

module.exports = ApiActions;
